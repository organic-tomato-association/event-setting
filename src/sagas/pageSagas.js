import { call, takeEvery, select } from "@redux-saga/core/effects";

import { getUrl } from './selecter';
import * as types from '../constants/ActionTypes';

// ページプッシュ
function* pagePushSaga() {
  const url = yield select(getUrl);
  yield call(() => {
    window.history.replaceState(null, '', url);
    // window.history.pushState(null, '', url);
  });
}

// ページポップ
function* pagePopSaga() {
  const url = yield select(getUrl);
  yield call(() => {
    window.history.replaceState(null, '', url);
    // window.history.pushState(null, '', url);
  });
}

export default [
  takeEvery(types.PAGE.PUSH, pagePushSaga),
  takeEvery(types.PAGE.POP, pagePopSaga),
];