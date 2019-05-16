import { reduxSagaFirebase, db } from "../../firebase";
import { put, take } from "@redux-saga/core/effects";

import * as Actions from '../../actions';
// import * as types from '../../constants/ActionTypes';

// イベントコレクションが更新されたら取得
export function* syncUsersSaga() {
  const channel = reduxSagaFirebase.firestore.channel(db.collection("users"));
  while (true) {
    try {
      const snapshot = yield take(channel);
      const users = [];
      snapshot.forEach(doc => {
        users.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      yield put(Actions.syncUsers(users));
    } catch (error) {

    }
  }
}

export default [

];