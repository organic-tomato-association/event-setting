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
  notification: {
    isShow: false,
    icon: 'md-check-circle',
    message: '',
  },
};

/**
 * storeを作る
 * @param {*} state 古いステート 
 * @param {*} action actionsで定義した 
 */
export default function ui(state = initialState, action) {
  switch (action.type) {
    case types.TAB_CHANGE:
      const title = action.id === 0 ? 'Home' : 'My Page';
      return {
        ...state,
        tab: action.payload.id,
        title: title,
      };
    case types.AUTH.LOGIN_SUCCESS:
      return {
        ...state,
        title: 'Home',
      };
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
      state.urlHistory.push(action.payload.url);
      return state;
    case types.PAGE.POP:
      state.urlHistory.pop();
      return state;
    case types.PAGE.FIRST_LOAD:
      return {
        ...state,
        isFirstLoad: false,
      };
    case types.NOTIFICATION.OPEN:
      return {
        ...state,
        notification: {
          isShow: true,
          icon: action.payload.icon,
          message: action.payload.message,
        },
      };
    case types.NOTIFICATION.CLOSE:
      return {
        ...state,
        notification: {
          isShow: false,
          style: 'md-check-circle',
          message: '',
        }
      };
    default:
      return state;
  }
}
