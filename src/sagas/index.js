import firebase from 'firebase/app';
import '@firebase/firestore';
import { reduxSagaFirebase } from "../firebase";
import { eventChannel } from 'redux-saga';
import { all, call, fork, put, take, takeEvery, select } from "@redux-saga/core/effects";

import * as Actions from '../actions';
import * as types from '../constants/ActionTypes';

const githubAuthProvider = new firebase.auth.GithubAuthProvider();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

const getUrl = (state) => state.ui.urlHistory[state.ui.urlHistory.length - 1];
const getUserId = (state) => state.auth.uid;
const getIsLoggedIn = (state) => state.auth.isLoggedIn;

// githubでログインする
function* loginGithubSaga() {
  try {
    yield call(reduxSagaFirebase.auth.signInWithPopup, githubAuthProvider);
    yield put(Actions.refLogin());
  } catch (e) {
    yield put(Actions.loginFailure(e));
  }
}

// Googleでログインする
function* loginGoogleSaga() {
  try {
    yield call(reduxSagaFirebase.auth.signInWithPopup, googleAuthProvider);
    yield put(Actions.refLogin());
  } catch (e) {
    yield put(Actions.loginFailure(e));
  }
}

// ログイン状態のチェック
function* refLoginSaga() {
  const channel = yield call(() => {
    const channel = eventChannel(emit => {
      const unsubscribe = firebase.auth().onAuthStateChanged(
        user => emit({ user }),
        error => emit({ error })
      )
      return unsubscribe
    })
    return channel;
  });
  const { user, error } = yield take(channel);
  if (user && !error) {
    yield put(Actions.loginSuccess(user));
    yield fork(syncEventsSaga);
  }
}

// ログアウトする
function* logoutSaga() {
  try {
    const data = yield call(reduxSagaFirebase.auth.signOut);
    yield put(Actions.logoutSuccess(data));
  }
  catch (error) {
    yield put(Actions.logoutFailure(error));
  }
}

// ページプッシュ
function* pagePushSaga() {
  const url = yield select(getUrl);
  yield call(() => {
    window.history.pushState(null, '', url);
  });
}

// ページポップ
function* pagePopSaga() {
  const url = yield select(getUrl);
  yield call(() => {
    window.history.pushState(null, '', url);
  });
}

// イベントコレクションが更新されたら取得
function* syncEventsSaga() {
  const channel = reduxSagaFirebase.firestore.channel('events');
  while (true) {
    try {
      const snapshot = yield take(channel);
      const events = [];
      snapshot.forEach(doc => {
        events.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      yield put(Actions.syncEvents(events));
      const isLoggedIn = yield select(getIsLoggedIn);
      if (!isLoggedIn) {
        yield put(Actions.setLoggedIn());
      }
    } catch (error) {

    }
  }
}

// イベント情報を更新する
function* updateEventSaga(action) {
  const { id, event } = action.payload;
  const uid = yield select(getUserId);
  if (event.created_by === uid && id === event.id) {
    delete event.id;
    try {
      yield call(reduxSagaFirebase.firestore.updateDocument, `events/${id}`, event);
    } catch (error) {
      console.error(error);
    }
  }
}


// イベント情報を更新する
function* createEventSaga(action) {
  const { event } = action.payload;
  event.created_by = yield select(getUserId);
  event.created_at = firebase.firestore.FieldValue.serverTimestamp();
  try {
    yield call(reduxSagaFirebase.firestore.addDocument, `events`, event);
  } catch (error) {
    console.error(error);
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery(types.AUTH.LOGIN_GITHUB, loginGithubSaga),
    takeEvery(types.AUTH.LOGIN_GOOGLE, loginGoogleSaga),
    takeEvery(types.AUTH.REF_LOGIN, refLoginSaga),
    takeEvery(types.AUTH.LOGOUT, logoutSaga),
    takeEvery(types.PAGE.PUSH, pagePushSaga),
    takeEvery(types.PAGE.POP, pagePopSaga),
    takeEvery(types.FIRESTORE.CREATE_EVENT, createEventSaga),
    takeEvery(types.FIRESTORE.UPDATE_EVENT, updateEventSaga),
  ]);
}