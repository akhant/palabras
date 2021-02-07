import {createStore, applyMiddleware} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import * as list from '../../groupedWordLists.json';
import * as verbs from '../../verbs.json';
import AsyncStorage from '@react-native-community/async-storage';

export const initStore = () => {
  //TODO remove in production
  AsyncStorage.clear();
  const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
  };

  //@ts-ignore
  const persistedReducer = persistReducer(persistConfig, rootReducer);
  const store = createStore(
    persistedReducer,
    {
      //@ts-ignore
      words: list.data,
      pageWords: list.data[0].words,
      data: {index: 0},
      verbs: verbs.data,
      verb: {},
    },
    applyMiddleware(thunk),
  );
  let persistor = persistStore(store);
  return {store, persistor};
};
