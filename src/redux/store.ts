import {createStore, applyMiddleware, combineReducers} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import AsyncStorage from '@react-native-community/async-storage';

export const initStore = () => {
  const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
  };

  const persistedReducer = persistReducer(persistConfig, rootReducer);
  const store = createStore(persistedReducer, {}, applyMiddleware(thunk));
  let persistor = persistStore(store);
  return {store, persistor};
};
