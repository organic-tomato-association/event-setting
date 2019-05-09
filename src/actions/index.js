import * as types from '../constants/ActionTypes';

export function login() {
  return {
    type: types.AUTH.LOGIN,
  }
}

export function refLogin() {
  return {
    type: types.AUTH.REF_LOGIN
  };
}

export function loginSuccess(user) {
  return {
    type: types.AUTH.LOGIN_SUCCESS,
    payload: {
      displayName: user.displayName,
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