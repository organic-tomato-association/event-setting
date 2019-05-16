import eventsSaga, { syncEventsSaga } from './events';
import { all, fork, take, takeEvery, put } from '@redux-saga/core/effects';

import * as Actions from '../../actions';
import * as types from '../../constants/ActionTypes';

// firestoreのコレクション同期タスク起動
function* syncSagas() {
  // forkしてコレクション同期処理を起動
  yield fork(syncEventsSaga);

  // 初期表示必要分の読み込みが終わるまで待機
  yield all([
    take(types.FIRESTORE.SYNC_EVENTS),
  ]);

  // ログイン状態を取得
  yield put(Actions.setLoggedIn());
}

export default [
  ...eventsSaga,
  takeEvery(types.AUTH.LOGIN_SUCCESS, syncSagas),
]