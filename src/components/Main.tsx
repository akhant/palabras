import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

const Main = () => {
  const [item, setItem] = useState('0');
  AsyncStorage.setItem('id', '0');
  const handleTestBtn = () => {
    AsyncStorage.getItem('id', (err, res) => {
      if (err) {
        console.log(err);
      }
      let newItemValue = (Number(item) + 1).toString();
      setItem(newItemValue);
      AsyncStorage.setItem('id', newItemValue);
    });
  };
  return (
    <>
      <SafeAreaView>
        <Text>Helloessss</Text>
        <Button onPress={handleTestBtn} title="test storage" />
        <Text>{item}</Text>
      </SafeAreaView>
    </>
  );
};

export default Main;
