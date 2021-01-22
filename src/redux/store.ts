import {createStore, applyMiddleware, combineReducers} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import * as list from '../../groupedWordLists.json';
import AsyncStorage from '@react-native-community/async-storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import hardSet from 'redux-persist/lib/stateReconciler/hardSet';
// import Storage from 'react-native-storage';

// export const storage = new Storage({
//   // maximum capacity, default 1000 key-ids
//   size: 3000,

//   // Use AsyncStorage for RN apps, or window.localStorage for web apps.
//   // If storageBackend is not set, data will be lost after reload.
//   storageBackend: AsyncStorage, // for web: window.localStorage

//   // expire time, default: 1 day (1000 * 3600 * 24 milliseconds).
//   // can be null, which means never expire.
//   defaultExpires: null,

//   // cache data in the memory. default is true.
//   enableCache: true,

//   // if data was not found in storage or expired data was found,
//   // the corresponding sync method will be invoked returning
//   // the latest data.
//   sync: {
//     // we'll talk about the details later.
//   },
// });

export const initStore = () => {
  AsyncStorage.clear();
  const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    stateReconciler: hardSet,
  };

  //@ts-ignore
  const persistedReducer = persistReducer(persistConfig, rootReducer);
  const store = createStore(
    persistedReducer,
    //@ts-ignore
    {words: list.data, pageWords: list.data[0].words},
    applyMiddleware(thunk),
  );
  let persistor = persistStore(store);
  return {store, persistor};
};
