// TODO: イベント作成時にコメント削除
// import * as types from '../constants/ActionTypes'

// 初期化
const initialState = {
  newEvents: {
    aaaa: {
      name: 'event1',
      description: 'event1',
    },
    bbbb: {
      name: 'event2',
      description: 'event2',
    },
    cccc: {
      name: 'event3',
      description: 'event3',
    },
    dddd: {
      name: 'event4',
      description: 'event4',
    },
    eeee: {
      name: 'event5',
      description: 'event5',
    },
  }
};

/**
 * storeを作る
 * @param {*} state 古いステート 
 * @param {*} action actionsで定義した 
 */
export default function data(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}