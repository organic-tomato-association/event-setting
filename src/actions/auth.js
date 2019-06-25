import * as types from '../constants/ActionTypes';

// ログインチェック
function refLogin() {
  return {
    type: types.AUTH.REF_LOGIN,
  };
}

// Githubログイン
function loginGithub() {
  return {
    type: types.AUTH.LOGIN_GITHUB,
  };
}

// Googleログイン
function loginGoogle() {
  return {
    type: types.AUTH.LOGIN_GOOGLE,
  }
}

// ログイン成功
function loginSuccess(user) {
  return {
    type: types.AUTH.LOGIN_SUCCESS,
    payload: {
      displayName: user.displayName,
      photoURL: user.photoURL,
      email: user.email,
      uid: user.uid,
    },
  };
}

// ログイン失敗
function loginFailure(e) {
  return {
    type: types.AUTH.LOGIN_FAILURE,
  };
}

// ログイン済み
function setLoggedIn() {
  return {
    type: types.AUTH.SET_LOGGED_IN,
  }
}

// ログアウト開始
function logout() {
  return {
    type: types.AUTH.LOGOUT,
  };
}

// ログアウト成功
function logoutSuccess(user) {
  return {
    type: types.AUTH.LOGOUT_SUCCESS,
    payload: {
      displayName: user.displayName,
      photoURL: user.photoURL,
      email: user.email,
      uid: user.uid,
    },
  };
}

// ログアウト失敗
function logoutFailure(e) {
  return {
    type: types.AUTH.LOGOUT_FAILURE,
  };
}

// ユーザープロファイル更新
function updateProfile(user, newPhoto) {
  return {
    type: types.AUTH.UPDATE,
    payload: {
      user,
      newPhoto,
    },
  };
}

function updateProfileSuccess (user) {
  return {
    type: types.AUTH.UPDATE_SUCCESS,
    payload: {
      user,
    },
  };
}

export default {
  refLogin,
  loginGithub,
  loginGoogle,
  setLoggedIn,
  loginSuccess,
  loginFailure,
  logout,
  logoutSuccess,
  logoutFailure,
  updateProfile,
  updateProfileSuccess,
}