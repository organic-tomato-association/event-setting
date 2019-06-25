import * as types from '../../constants/ActionTypes';

// ユーザーログイン時にユーザー名とユーザー画像をセットする
function setUser(user) {
  return {
    type: types.FIRESTORE.USERS.SET,
    payload: {
      user,
    },
  };
}

// ユーザーコレクション同期
function syncUsers(users) {
  return {
    type: types.FIRESTORE.USERS.SYNC,
    payload: {
      users,
    },
  };
}


// ユーザー情報更新
function updateUser(user) {
  return {
    type: types.FIRESTORE.USERS.UPDATE,
    payload: {
      user,
    }
  }
}

export default {
  setUser,
  syncUsers,
  updateUser,
};