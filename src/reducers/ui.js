import * as types from '../constants/ActionTypes'

// 初期化
const initialState = {
  title: 'Login',
  tab: 0,
  isShowSplitter: false,
  isFirstLoad: true,
  urlHistory: [
    '/',
  ],
};

/**
 * storeを作る
 * @param {*} state 古いステート 
 * @param {*} action actionsで定義した 
 */
export default function ui(state = initialState, action) {
  switch (action.type) {
    case types.TAB_CHANGE:
      const title = action.id === 0 ? 'Home' : 'My Page'
      return {
        ...state,
        tab: action.id,
        title: title,
      };
    case types.AUTH.LOGIN_SUCCESS:
      return {
        ...state,
        title: 'Home',
      }
    case types.OPEN_SPLITTER:
      return {
        ...state,
        isShowSplitter: true,
      };
    case types.CLOSE_SPLITTER:
      return {
        ...state,
        isShowSplitter: false,
      };
    case types.PAGE.PUSH:
      state.urlHistory.push(action.url);
      return state;
    case types.PAGE.POP:
      state.urlHistory.pop();
      return state;
    case types.PAGE.FIRST_LOAD:
      return {
        ...state,
        isFirstLoad: false,
      }
    default:
      return state;
  }
}