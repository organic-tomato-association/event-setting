import firebase from 'firebase/app';
import '@firebase/firestore';
import { reduxSagaFirebase } from "../firebase";
import { eventChannel } from 'redux-saga';
import { call, put, take, takeEvery, select } from "@redux-saga/core/effects";

import Actions from '../actions';
import { getUserId } from "./selecter";
import * as types from '../constants/ActionTypes';

const githubAuthProvider = new firebase.auth.GithubAuthProvider();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

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
    return eventChannel(emit => {
      return firebase.auth().onAuthStateChanged(
        user => emit({ user }),
        error => emit({ error })
      );
    });
  });
  const { user, error } = yield take(channel);
  if (user && !error) {
    yield put(Actions.loginSuccess(user));
  }
}

// ユーザー基本プロファイルを更新する
function* updateAuthSaga(action) {
  const user = action.payload.user;
  const image = action.payload.newPhoto;
  if (!!image) {
    const uid = yield select(getUserId);
    try {
      const task = reduxSagaFirebase
        .storage.uploadFile(`userIcon/${uid}.jpg`, image);
      yield task;
      user.photoURL = yield call(reduxSagaFirebase.storage.getDownloadURL, `userIcon/${uid}.jpg`);
    } catch(error) {
      console.log(error);
    }
  }
  try {
    console.log(user);
    yield call(reduxSagaFirebase.auth.updateProfile, user);
    yield put(Actions.setUser(user));
    yield put(Actions.updateProfileSuccess(user));
  } catch (error) {
    console.log(error);
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

export default [
  takeEvery(types.AUTH.LOGIN_GITHUB, loginGithubSaga),
  takeEvery(types.AUTH.LOGIN_GOOGLE, loginGoogleSaga),
  takeEvery(types.AUTH.REF_LOGIN, refLoginSaga),
  takeEvery(types.AUTH.UPDATE, updateAuthSaga),
  takeEvery(types.AUTH.LOGOUT, logoutSaga),
];