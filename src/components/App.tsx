import React, {useState} from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {Provider as PaperProvider} from 'react-native-paper';
import WordsScreen from './WordsScreen';
import {initStore} from '../redux/store';
import {IGroup} from '../interfaces';
import {CHANGE_INDEX} from '../redux/const';

const Drawer = createDrawerNavigator();

let {store, persistor} = initStore();

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <PaperProvider>
          <NavigationContainer
            onStateChange={(state) =>
              store.dispatch({
                type: CHANGE_INDEX,
                payload: {index: state.index},
              })
            }>
            <Drawer.Navigator>
              {store.getState().words?.map((item: IGroup) => {
                return (
                  <Drawer.Screen
                    key={item.groupId}
                    //@ts-ignore
                    name={item.groupName?.toUpperCase()}>
                    {(props) => (
                      <WordsScreen {...props} groupId={item.groupId} />
                    )}
                  </Drawer.Screen>
                );
              })}
            </Drawer.Navigator>
          </NavigationContainer>
        </PaperProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
