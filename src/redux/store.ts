import {createStore, applyMiddleware} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import * as list from '../../groupedWordLists.json';
import AsyncStorage from '@react-native-community/async-storage';
// import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
// import hardSet from 'redux-persist/lib/stateReconciler/hardSet';

export const initStore = () => {
  //TODO remove in production
  AsyncStorage.clear();
  const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    // stateReconciler: hardSet,
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
    },
    applyMiddleware(thunk),
  );
  let persistor = persistStore(store);
  return {store, persistor};
};
