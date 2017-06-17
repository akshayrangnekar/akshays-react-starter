import { combineReducers } from 'redux';
import counterReducer from './counter.js';

const rootReducer = combineReducers({
  counter: counterReducer,
});

export default rootReducer;
