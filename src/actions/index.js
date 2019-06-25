import auth from './auth';
import page from './page';
import firestore from './firestore';
import * as types from "../constants/ActionTypes";

// タブ切替
function tabChange(id) {
  return {
    type: types.TAB_CHANGE,
    payload: {
      id,
    }
  };
}

// メニュー非表示
function closeSplitter() {
  return {
    type: types.CLOSE_SPLITTER,
  };
}

// メニュー表示
function openSplitter() {
  return {
    type: types.OPEN_SPLITTER,
  };
}

export default {
  ...auth,
  ...page,
  ...firestore,
  tabChange,
  closeSplitter,
  openSplitter,
};