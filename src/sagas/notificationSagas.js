import { put, takeEvery, delay } from '@redux-saga/core/effects';

import Actions from '../actions';
import * as types from '../constants/ActionTypes';

// 通知を3秒後に閉じる
function* notificationOpenSagas() {
  yield delay(3000);

  yield put(Actions.notificationClose())
}

export default [
  takeEvery(types.NOTIFICATION.OPEN, notificationOpenSagas),
]