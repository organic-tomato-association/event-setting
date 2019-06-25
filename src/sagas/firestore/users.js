import { reduxSagaFirebase, db } from "../../firebase";
import { call, put, take, takeEvery, select } from "@redux-saga/core/effects";

import Actions from '../../actions';
import { getUserId } from "../selecter";
import * as types from '../../constants/ActionTypes';

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

// Authの情報をユーザーテーブルに反映
function* setUserSaga(action) {
  const uid = yield select(getUserId);
  const user = action.payload.user;
  const options = {
    merge: true,
  };
  try {
    yield call(reduxSagaFirebase.firestore.setDocument, `users/${uid}`, user, options);
  } catch (error) {
    console.log(error);
  }
}

export default [
  takeEvery(types.FIRESTORE.USERS.SET, setUserSaga),
];