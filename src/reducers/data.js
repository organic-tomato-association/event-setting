import * as types from '../constants/ActionTypes';

// TODO: イベント作成時にコメント削除
// import * as types from '../constants/ActionTypes'

// 初期化
const initialState = {
  events: {},
};

/**
 * storeを作る
 * @param {*} state 古いステート 
 * @param {*} action actionsで定義した 
 */
export default function data(state = initialState, action) {
  switch (action.type) {
    case types.FIRESTORE.SYNC_EVENTS:
      return {
        ...state,
        events: action.events,
      };
    default:
      return state;
  }
}