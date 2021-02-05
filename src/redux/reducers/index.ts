import {combineReducers} from 'redux';

import words from './words';
import pageWords from './pageWords';
import data from './data';
import verbs from './verbs';
import verb from './verb';

const rootReducer = combineReducers({
  words,
  pageWords,
  data,
  verbs,
  verb,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
