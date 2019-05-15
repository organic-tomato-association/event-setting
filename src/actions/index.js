import * as types from '../constants/ActionTypes';

// ログインチェック
export function refLogin() {
  return {
    type: types.AUTH.REF_LOGIN
  };
}

// Githubログイン
export function loginGithub() {
  return {
    type: types.AUTH.LOGIN_GITHUB,
  }
}

// Googleログイン
export function loginGoogle() {
  return {
    type: types.AUTH.LOGIN_GOOGLE,
  }
}

// ログイン成功
export function loginSuccess(user) {
  return {
    type: types.AUTH.LOGIN_SUCCESS,
    payload: {
      displayName: user.displayName,
      photoUrl: user.photoURL,
      email: user.email,
      uid: user.uid,
    },
  };
}

// ログイン失敗
export function loginFailure(e) {
  return {
    type: types.AUTH.LOGIN_FAILURE,
  };
}

// ログイン済み
export function setLoggedIn() {
  return {
    type: types.AUTH.SET_LOGGED_IN,
  }
}

// ログアウト開始
export function logout() {
  return {
    type: types.AUTH.LOGOUT,
  };
}

// ログアウト成功
export function logoutSuccess(user) {
  return {
    type: types.AUTH.LOGOUT_SUCCESS,
    payload: {
      displayName: user.displayName,
      photoUrl: user.photoURL,
      email: user.email,
      uid: user.uid,
    },
  };
}

// ログアウト失敗
export function logoutFailure(e) {
  return {
    type: types.AUTH.LOGOUT_FAILURE,
  };
}

// ページPUSH
export function pagePush(url) {
  return {
    type: types.PAGE.PUSH,
    url,
  };
}

// ページPOP
export function pagePop() {
  return {
    type: types.PAGE.POP,
  };
}

// 初回ロード
export function firstLoad() {
  return {
    type: types.PAGE.FIRST_LOAD,
  }
}

// タブ切替
export function tabChange(id) {
  return {
    type: types.TAB_CHANGE,
    id,
  };
}

// メニュー非表示
export function closeSplitter() {
  return {
    type: types.CLOSE_SPLITTER,
  };
}

// メニュー表示
export function openSplitter() {
  return {
    type: types.OPEN_SPLITTER,
  };
}

// 表示名更新
export function updateDisplayName(displayName) {
  return {
    type: types.UPDATE_DISPLAY_NAME,
    displayName,
  };
}

// イベントコレクションの同期
export function syncEvents(events) {
  return {
    type: types.FIRESTORE.SYNC_EVENTS,
    events,
  };
}

// イベント作成
export function createEvent(event) {
  return {
    type: types.FIRESTORE.CREATE_EVENT,
    payload: {
      event,
    },
  };
}

// イベントの更新
export function updateEvent(id, event) {
  return {
    type: types.FIRESTORE.UPDATE_EVENT,
    payload: {
      id,
      event,
    },
  };
}

// イベントの削除
export function deleteEvent(id, event) {
  return {
    type: types.FIRESTORE.DELETE_EVENT,
    payload: {
      id,
      event,
    },
  };
}