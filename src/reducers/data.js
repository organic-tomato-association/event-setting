import * as types from '../constants/ActionTypes';

// TODO: イベント作成時にコメント削除
// import * as types from '../constants/ActionTypes'

// 初期化
const initialState = {
  events: {},
  users: {},
};

/**
 * storeを作る
 * @param {*} state 古いステート 
 * @param {*} action actionsで定義した 
 */
export default function data(state = initialState, action) {
  switch (action.type) {
    case types.FIRESTORE.EVENTS.SYNC:
      return {
        ...state,
        events: action.payload.events,
      };
    case types.FIRESTORE.USERS.SYNC:
      return {
        ...state,
        users: action.payload.users,
      };
    default:
      return state;
  }
}