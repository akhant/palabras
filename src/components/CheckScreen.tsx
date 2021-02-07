import {Picker} from '@react-native-picker/picker';
import React, {useState} from 'react';
import {Pressable, View, Text, StyleSheet, Dimensions} from 'react-native';
import {Button, FAB} from 'react-native-paper';
import {connect} from 'react-redux';
import {ICheckScreenProps} from '../interfaces';
import {RootState} from '../redux/reducers';
import {generateNewWord} from '../utils';

const CheckScreen: React.FC<ICheckScreenProps> = ({words, navigation}) => {
  const [mode, setMode] = useState('RU');
  const [category, setCategory] = useState('ALL');
  const [word, setWord] = useState(generateNewWord(words, category));

  const [visibleWord, setVisibleWord] = useState(false);

  const handlePressWord = () => {
    setVisibleWord(!visibleWord);
  };

  const handleNextPress = () => {
    setWord(generateNewWord(words, category));
    setVisibleWord(false);
  };

  const handleChangeMode = (value: any) => {
    setMode(value);
  };

  const handleChangeCategory = (value: any) => {
    setCategory(value);
    setWord(generateNewWord(words, value));
    setVisibleWord(false);
  };

  const handleToggleDrawer = () => {
    navigation.toggleDrawer();
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
    <>
      <View style={styles.card}>
        <View style={styles.categroySelectWrapper}>
          <Picker
            style={{justifyContent: 'center', width: 150, height: 50}}
            selectedValue={category}
            mode="dropdown"
            onValueChange={handleChangeCategory}>
            <Picker.Item key={'-1'} label="ВСЕ СЛОВА" value="ALL" />
            {words?.map((group) => (
              <Picker.Item
                key={group.groupId}
                label={group.groupName.toUpperCase()}
                value={group.groupId}
              />
            ))}
          </Picker>
        </View>
        <View style={styles.modeSelectWrapper}>
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
      {/*
      //@ts-ignore */}
      <FAB
        style={styles.fabMenu}
        small
        color="#fff"
        icon="menu"
        onPress={handleToggleDrawer}
      />
    </>
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
  modeSelectWrapper: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  categroySelectWrapper: {
    position: 'absolute',
    top: 10,
    left: Dimensions.get('window').width / 3,
  },
  fabMenu: {
    position: 'absolute',
    top: 0,
    left: 0,
    margin: 16,
    backgroundColor: '#3A98FF',
  },
});

export default connect(({words}: RootState) => ({words}))(CheckScreen);
