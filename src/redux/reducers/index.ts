import {combineReducers} from 'redux';

import words from './words';
import pageWords from './pageWords';
import data from './data';

const rootReducer = combineReducers({
  words,
  pageWords,
  data,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
