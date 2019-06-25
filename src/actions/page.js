import * as types from '../constants/ActionTypes';

// ページPUSH
function pagePush(url) {
  return {
    type: types.PAGE.PUSH,
    payload: {
      url,
    },
  };
}

// ページPOP
function pagePop() {
  return {
    type: types.PAGE.POP,
  };
}

// 初回ロード
function firstLoad() {
  return {
    type: types.PAGE.FIRST_LOAD,
  }
}

export default {
  pagePush,
  pagePop,
  firstLoad,
};