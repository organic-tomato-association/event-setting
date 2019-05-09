import firebase from 'firebase';
import { reduxSagaFirebase } from "../firebase";
import { eventChannel } from 'redux-saga';
import { all, call, put, take, takeEvery } from "@redux-saga/core/effects";

import * as Actions from '../actions';
import * as types from '../constants/ActionTypes';

const githubAuthProvider = new firebase.auth.GithubAuthProvider();

// githubでログインする
function* loginGithubSaga() {
  try {
    yield call(reduxSagaFirebase.auth.signInWithPopup, githubAuthProvider);
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
  }
}

function* logoutSaga() {
  try {
    const data = yield call(reduxSagaFirebase.auth.signOut);
    yield put(Actions.logoutSuccess(data));
  }
  catch (error) {
    yield put(Actions.logoutFailure(error));
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery(types.AUTH.REF_LOGIN, refLoginSaga),
    takeEvery(types.AUTH.LOGIN, loginGithubSaga),
    takeEvery(types.AUTH.LOGOUT, logoutSaga),
  ]);
}