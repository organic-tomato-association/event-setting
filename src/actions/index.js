import * as types from '../constants/ActionTypes';

export function loginOk(user) {
  return {
    type: types.LOGIN_OK,
    payload: {
      displayName: user.displayName,
      photoUrl: user.photoURL,
      email: user.email,
      uid: user.uid,
    },
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