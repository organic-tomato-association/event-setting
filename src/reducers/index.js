import { combineReducers } from 'redux';
import ui from './ui';
import data from './data';
import auth from './auth';

const reducer = combineReducers({
  ui,
  data,
  auth,
});

export default reducer;