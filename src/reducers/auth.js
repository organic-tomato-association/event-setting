import * as types from '../constants/ActionTypes';

// 初期化
const initialState = {
  isLoggedIn: false,
  uid: null,
  displayName: null,
  photoURL: null,
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
        photoURL: action.payload.photoURL,
        email: action.payload.email,
      };
    case types.AUTH.LOGOUT:
      return {
        ...state,
        uid: null,
        displayName: null,
        photoURL: null,
        email: null,
      };
    case types.AUTH.UPDATE_SUCCESS:
      return {
        ...state,
        displayName: action.payload.user.displayName,
        photoURL: action.payload.user.photoURL,
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