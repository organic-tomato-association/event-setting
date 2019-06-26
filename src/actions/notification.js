import * as types from '../constants/ActionTypes';

// 通知表示
function notificationOpen(message, icon = 'md-check-circle') {
  return {
    type: types.NOTIFICATION.OPEN,
    payload: {
      icon,
      message,
    },
  };
}

// 通知削除
function notificationClose() {
  return {
    type: types.NOTIFICATION.CLOSE,
  };
}


export default {
  notificationOpen,
  notificationClose,
};