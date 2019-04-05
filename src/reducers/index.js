import { combineReducers } from 'redux';
import ui from './ui';
import data from './data';

const reducer = combineReducers({
  ui,
  data,
});

export default reducer;