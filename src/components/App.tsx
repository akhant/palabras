import React, {useState} from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {Provider as PaperProvider} from 'react-native-paper';
import WordsScreen from './WordsScreen';
import {initStore} from '../redux/store';
import {IGroup} from '../interfaces';
import {Linking, Platform} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {CHANGE_INDEX, GET_DATA, PERSISTENCE_KEY} from '../redux/const';

const Drawer = createDrawerNavigator();

let {store, persistor} = initStore();

const App = () => {
  const [isReady, setIsReady] = React.useState(false);
  const [initialState, setInitialState] = React.useState();

  React.useEffect(() => {
    const restoreState = async () => {
      try {
        const initialUrl = await Linking.getInitialURL();

        if (Platform.OS !== 'web' && initialUrl == null) {
          // Only restore state if there's no deep link and we're not on web
          const savedStateString = await AsyncStorage.getItem(PERSISTENCE_KEY);
          const state = savedStateString
            ? JSON.parse(savedStateString)
            : undefined;

          if (state !== undefined) {
            setInitialState(state);
          }
        }
      } finally {
        setIsReady(true);
      }
    };

    if (!isReady) {
      restoreState();
    }
  }, [isReady]);

  if (!isReady) {
    return null;
  }
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <PaperProvider>
          <NavigationContainer
            initialState={initialState}
            onStateChange={(state) => {
              console.log('state change');
              AsyncStorage.setItem(PERSISTENCE_KEY, JSON.stringify(state));
              store.dispatch({
                type: CHANGE_INDEX,
                payload: {index: state.index},
              });
              store.dispatch({
                type: GET_DATA,
                payload: {groupId: state.index, words: store.getState().words},
              });
            }}>
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
