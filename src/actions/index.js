import * as types from '../constants/ActionTypes';

export function tabChange(id) {
  return {
    type: types.TAB_CHANGE,
    id,
  };
}
