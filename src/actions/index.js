import * as types from '../constants/ActionTypes';

export function loginOk(user) {
  return {
    type: types.LOGIN_OK,
    payload: {
      displayName: user.displayName,
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
