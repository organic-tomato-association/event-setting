import * as types from '../constants/ActionTypes'

// 初期化
const initialState = {
  title: 'Home',
  tab: 0,
};

/**
 * storeを作る
 * @param {*} state 古いステート 
 * @param {*} action actionsで定義した 
 */
export default function ui(state = initialState, action) {
  switch (action.type) {
    case types.TAB_CHANGE:
      const title = action.id === 0 ? 'Home' : 'Settings'
      return {
        ...state,
        tab: action.id,
        title: title,
      };
    default:
      return state;
  }
}