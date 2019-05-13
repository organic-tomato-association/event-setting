import * as types from '../constants/ActionTypes';

export function refLogin() {
  return {
    type: types.AUTH.REF_LOGIN
  };
}

export function loginGithub() {
  return {
    type: types.AUTH.LOGIN_GITHUB,
  }
}

export function loginGoogle() {
  return {
    type: types.AUTH.LOGIN_GOOGLE,
  }
}

export function loginSuccess(user) {
  return {
    type: types.AUTH.LOGIN_SUCCESS,
    payload: {
      displayName: user.displayName,
      photoUrl: user.photoURL,
      email: user.email,
      uid: user.uid,
    },
  };
}

export function loginFailure(e) {
  return {
    type: types.AUTH.LOGIN_FAILURE,
  };
}

export function logout() {
  return {
    type: types.AUTH.LOGOUT,
  };
}

export function logoutSuccess(user) {
  return {
    type: types.AUTH.LOGOUT_SUCCESS,
    payload: {
      displayName: user.displayName,
      photoUrl: user.photoURL,
      email: user.email,
      uid: user.uid,
    },
  };
}

export function logoutFailure(e) {
  return {
    type: types.AUTH.LOGOUT_FAILURE,
  };
}

export function pagePush(url) {
  return {
    type: types.PAGE.PUSH,
    url,
  };
}

export function pagePop() {
  return {
    type: types.PAGE.POP,
  };
}

export function firstLoad() {
  return {
    type: types.PAGE.FIRST_LOAD,
  }
}

export function tabChange(id) {
  return {
    type: types.TAB_CHANGE,
    id,
  };
}

export function closeSplitter() {
  return {
    type: types.CLOSE_SPLITTER,
  };
}

export function openSplitter() {
  return {
    type: types.OPEN_SPLITTER,
  };
}

export function updateDisplayName(displayName) {
  return {
    type: types.UPDATE_DISPLAY_NAME,
    displayName,
  };
}