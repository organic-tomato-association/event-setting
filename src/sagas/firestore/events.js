import firebase from 'firebase/app';
import { reduxSagaFirebase, db } from "../../firebase";
import { call, put, take, takeEvery, select } from "@redux-saga/core/effects";

import { getUserId } from '../selecter';
import Actions from '../../actions';
import * as types from '../../constants/ActionTypes';

// イベントコレクションが更新されたら取得
export function* syncEventsSaga() {
  const channel = reduxSagaFirebase.firestore.channel(db.collection("events").orderBy('created_at', 'desc'));
  while (true) {
    try {
      const snapshot = yield take(channel);
      const events = [];
      snapshot.forEach(doc => {
        events.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      yield put(Actions.syncEvents(events));
    } catch (error) {

    }
  }
}

// イベント画像をアップロードしてURLを取得する
function* uploadEventImage(image, eventId) {
  const uid = yield select(getUserId);
  const task = reduxSagaFirebase
    .storage.uploadFile(`events/${uid}/${eventId}.jpg`, image);
  yield task;
  return yield call(reduxSagaFirebase.storage.getDownloadURL, `events/${uid}/${eventId}.jpg`);
}

// イベント情報を作成する
function* createEventSaga(action) {
  const { event, image } = action.payload;
  event.created_by = yield select(getUserId);
  event.created_at = firebase.firestore.FieldValue.serverTimestamp();
  try {
    const { id } = yield call(reduxSagaFirebase.firestore.addDocument, 'events', event);
    if(!!image) {
      event.photoURL = yield call(uploadEventImage, image, id);
      yield call(reduxSagaFirebase.firestore.updateDocument, `events/${id}`, event);
    }
    yield put(Actions.notificationOpen('イベント情報を登録しました'));
  } catch (error) {
    console.error(error);
  }
}

// イベント情報を更新する
function* updateEventSaga(action) {
  const { id, event, image } = action.payload;
  const sendEvent = {};
  Object.assign(sendEvent, event);
  const uid = yield select(getUserId);
  if (sendEvent.created_by === uid && id === sendEvent.id) {
    delete sendEvent.id;
    try {
      if(!!image) {
        sendEvent.photoURL = yield call(uploadEventImage, image, id);
      }
      yield call(reduxSagaFirebase.firestore.updateDocument, `events/${id}`, sendEvent);
      yield put(Actions.notificationOpen('イベント情報を更新しました'));
    } catch (error) {
      console.error(error);
    }
  }
}

// イベント情報を削除する
function* deleteEventSaga(action) {
  const { id, event } = action.payload;
  const uid = yield select(getUserId);
  if (event.created_by === uid) {
    try {
      yield call(reduxSagaFirebase.firestore.deleteDocument, `events/${id}`);
      yield call(reduxSagaFirebase.storage.deleteFile, `events/${uid}/${id}.jpg`);
      yield put(Actions.notificationOpen('イベント情報を削除しました'));
    } catch (error) {
      console.error(error);
    }
  }
}

export default [
  takeEvery(types.FIRESTORE.EVENTS.CREATE, createEventSaga),
  takeEvery(types.FIRESTORE.EVENTS.UPDATE, updateEventSaga),
  takeEvery(types.FIRESTORE.EVENTS.DELETE, deleteEventSaga),
];