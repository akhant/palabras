import {combineReducers} from 'redux';

import words from './words';
import pageWords from './pageWords';

const rootReducer = combineReducers({
  words,
  pageWords,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
