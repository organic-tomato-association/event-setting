import * as types from '../../constants/ActionTypes';

// イベントコレクションの同期
function syncEvents(events) {
  return {
    type: types.FIRESTORE.EVENTS.SYNC,
    payload: {
      events,
    },
  };
}

// イベント作成
function createEvent(event) {
  return {
    type: types.FIRESTORE.EVENTS.CREATE,
    payload: {
      event,
    },
  };
}

// イベントの更新
function updateEvent(id, event) {
  return {
    type: types.FIRESTORE.EVENTS.UPDATE,
    payload: {
      id,
      event,
    },
  };
}

// イベントの削除
function deleteEvent(id, event) {
  return {
    type: types.FIRESTORE.EVENTS.DELETE,
    payload: {
      id,
      event,
    },
  };
}

export default {
  syncEvents,
  createEvent,
  updateEvent,
  deleteEvent,
}