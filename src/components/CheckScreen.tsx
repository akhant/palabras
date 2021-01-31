import {Picker} from '@react-native-picker/picker';
import React, {useState, useReducer} from 'react';
import {Pressable, View, Text, StyleSheet} from 'react-native';
import {Button, Menu} from 'react-native-paper';
import {connect} from 'react-redux';
import {ICheckScreenProps} from '../interfaces';
import {RootState} from '../redux/reducers';
import {generateNewWord} from '../utils';

const CheckScreen: React.FC<ICheckScreenProps> = ({words}) => {
  const [mode, setMode] = useState('RU');
  const [word, setWord] = useState(generateNewWord(words));

  const [visibleWord, setVisibleWord] = useState(false);

  const handlePressWord = () => {
    setVisibleWord(!visibleWord);
  };
  const handleNextPress = () => {
    setWord(generateNewWord(words));
    setVisibleWord(false);
  };

  const handleChangeMode = (value: any) => {
    setMode(value);
  };
  const renderWords = () => {
    if (mode === 'RU') {
      return (
        <>
          <Text style={styles.text}>{word.ru}</Text>
          {visibleWord && (
            <>
              <Text style={styles.text}> - </Text>
              <Text style={styles.text}>{word.es}</Text>
            </>
          )}
        </>
      );
    } else if (mode === 'ES') {
      return (
        <>
          <Text style={styles.text}>{word.es}</Text>
          {visibleWord && (
            <>
              <Text style={styles.text}> - </Text>
              <Text style={styles.text}>{word.ru}</Text>
            </>
          )}
        </>
      );
    } else if (mode === 'MIX') {
      let randomInt = Math.random();
      return (
        <>
          <Text style={styles.text}>
            {randomInt >= 0.5 ? word.ru : word.es}
          </Text>
          {visibleWord && (
            <>
              <Text style={styles.text}> - </Text>
              <Text style={styles.text}>
                {randomInt >= 0.5 ? word.es : word.ru}
              </Text>
            </>
          )}
        </>
      );
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.menuWrapper}>
        <Picker
          style={{justifyContent: 'center', width: 60, height: 50}}
          selectedValue={mode}
          mode="dropdown"
          onValueChange={handleChangeMode}>
          <Picker.Item label="RU" value="RU" />
          <Picker.Item label="ES" value="ES" />
          <Picker.Item label="MIX" value="MIX" />
        </Picker>
      </View>

      <Pressable onPress={handlePressWord} style={styles.item}>
        {renderWords()}
      </Pressable>
      {/*
    //@ts-ignore */}
      <Button color={'#3A98FF'} onPress={handleNextPress}>
        Далее
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 20,
    margin: 20,
    borderRadius: 10,
    flexWrap: 'wrap',
  },
  card: {
    justifyContent: 'center',
    flex: 1,
  },
  text: {
    fontSize: 25,
  },
  menuButton: {},
  menu: {},
  menuWrapper: {
    position: 'absolute',
    top: 0,
    right: 10,
  },
});

export default connect(({words}: RootState) => ({words}))(CheckScreen);
