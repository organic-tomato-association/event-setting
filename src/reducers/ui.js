import * as types from '../constants/ActionTypes'

// 初期化
const initialState = {
  title: 'Login',
  tab: 0,
  isShowSplitter: false,
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
    case types.LOGIN_OK:
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
    default:
      return state;
  }
}