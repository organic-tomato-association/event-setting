import { all, fork, take, takeEvery, put } from '@redux-saga/core/effects';

import * as Actions from '../../actions';
import * as types from '../../constants/ActionTypes';

import eventsSaga, { syncEventsSaga } from './events';
import usersSaga, { syncUsersSaga } from './users';

// firestoreのコレクション同期タスク起動
function* syncSagas() {
  // forkしてコレクション同期処理を起動
  yield fork(syncEventsSaga);
  yield fork(syncUsersSaga);

  // 初期表示必要分の読み込みが終わるまで待機
  yield all([
    yield take(types.FIRESTORE.EVENTS.SYNC),
    yield take(types.FIRESTORE.USERS.SYNC),
  ]);

  // ログイン状態を取得
  yield put(Actions.setLoggedIn());
}

export default [
  ...eventsSaga,
  ...usersSaga,
  takeEvery(types.AUTH.LOGIN_SUCCESS, syncSagas),
]