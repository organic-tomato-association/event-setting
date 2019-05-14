import * as types from '../constants/ActionTypes';

// 初期化
const initialState = {
  isLoggedIn: false,
  uid: null,
  displayName: null,
  email: null,
};

/**
 * storeを作る
 * @param {*} state 古いステート 
 * @param {*} action actionsで定義した 
 */
export default function auth(state = initialState, action) {
  switch (action.type) {
    case types.AUTH.LOGIN_SUCCESS:
      return {
        ...state,
        uid: action.payload.uid,
        displayName: action.payload.displayName,
        photoUrl: action.payload.photoUrl,
        email: action.payload.email,
      };
    case types.AUTH.LOGOUT:
      return {
        ...state,
        uid: null,
        displayName: null,
        email: null,
      };
    case types.UPDATE_DISPLAY_NAME:
      return {
        ...state,
        displayName: action.displayName,
      };
    case types.AUTH.SET_LOGGED_IN:
      return {
        ...state,
        isLoggedIn: true,
      };
    default:
      return state;
  }
}