import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, View, Text, StatusBar} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {connect} from 'react-redux';
import {RootState} from '../redux/reducers';
import {IWord, IWordsScreenProps} from '../interfaces';
import {getData, addWord} from '../redux/actions';
import {FAB, Modal, TextInput, Button} from 'react-native-paper';

const WordsScreen: React.FC<IWordsScreenProps> = React.memo(
  ({pageWords, words, addWord, getData, groupId}) => {
    console.log('pageWords', pageWords);
    const [visible, setVisible] = React.useState(false);
    const [textRu, setTextRu] = React.useState('');
    const [textEs, setTextEs] = React.useState('');
    const [stateGroupId, setStateGroupId] = React.useState(groupId);

    console.log('stateGroupId', stateGroupId);
    const wordItem = ({item}: any) => {
      return (
        <View key={item.wordId} style={styles.listItem}>
          <Text>{item.ru}</Text>
          <Text> - </Text>
          <Text>{item.es}</Text>
        </View>
      );
    };

    useEffect(() => {
      getData(groupId);
    }, []);

    const onPressShowModal = () => {
      setVisible(true);
    };

    const onPressAddWord = () => {
      // if empty data
      if (!textRu || !textEs) return;
      if (groupId && pageWords?.length) {
        addWord({
          ru: textRu,
          es: textEs,
          groupId: stateGroupId,
          //@ts-ignore
          wordId: stateGroupId + (pageWords.length + 1),
        });
      } else {
        return;
      }
    };
    const hideModal = () => setVisible(false);

    return (
      <>
        {pageWords && (
          <FlatList
            keyExtractor={(item, i) => {
              //@ts-ignore
              return item.wordId.toString();
            }}
            data={pageWords}
            renderItem={wordItem}
          />
        )}
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={styles.modal}>
          {/* 
          //@ts-ignore */}
          <TextInput
            label="RU"
            value={textRu}
            onChangeText={(text) => setTextRu(text)}
          />
          {/* 
//@ts-ignore */}
          <TextInput
            label="ES"
            value={textEs}
            onChangeText={(text) => setTextEs(text)}
          />
          {/* 
//@ts-ignore */}
          <Button mode="contained" onPress={onPressAddWord}>
            add word
          </Button>
        </Modal>
        {/* 
//@ts-ignore */}
        <FAB style={styles.fab} small icon="plus" onPress={onPressShowModal} />
      </>
    );
  },
);

const styles = StyleSheet.create({
  listItem: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 5,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  modal: {
    backgroundColor: 'white',
    padding: 20,
  },
});

export default connect(
  ({words, pageWords}: RootState) => ({words, pageWords}),
  {
    getData,
    addWord,
  },
)(WordsScreen);

// {/*
//
//