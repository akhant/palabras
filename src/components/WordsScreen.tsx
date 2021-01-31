import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, View, Text, Pressable} from 'react-native';
import {connect} from 'react-redux';
import {RootState} from '../redux/reducers';
import {IWordsScreenProps} from '../interfaces';
import {getData, addWord} from '../redux/actions';
import {FAB, Modal, TextInput, Button} from 'react-native-paper';
import WordItem from './WordItem';

const WordsScreen: React.FC<IWordsScreenProps> = React.memo(
  ({pageWords, data, addWord, getData, groupId}) => {
    const [visible, setVisible] = React.useState(false);
    const [textRu, setTextRu] = React.useState('');
    const [textEs, setTextEs] = React.useState('');
    const [stateGroupId, setStateGroupId] = React.useState(groupId);
    console.log(groupId, data.index);
    useEffect(() => {
      //console.log(groupId, index);
      if (stateGroupId === data.index.toString()) {
        getData(groupId);
      }
    }, [data.index]);

    const onPressShowModal = () => {
      setVisible(true);
    };

    const onPressAddWord = () => {
      // if empty data
      if (!textRu || !textEs) return;
      setTextEs('');
      setTextRu('');
      if (groupId && pageWords?.length) {
        addWord({
          ru: textRu,
          es: textEs,
          groupId: stateGroupId,
          //@ts-ignore
          wordId: stateGroupId + (pageWords.length + 1),
        });
        setVisible(false);
      } else {
        return;
      }
    };
    const hideModal = () => setVisible(false);

    const renderItem = ({item}: any) => {
      return <WordItem item={item} />;
    };

    return (
      <>
        {pageWords && (
          <FlatList
            keyExtractor={(item, i) => {
              //@ts-ignore
              return item.wordId.toString();
            }}
            data={pageWords}
            renderItem={renderItem}
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
        <FAB
          style={styles.fab}
          small
          color="#fff"
          icon="plus"
          onPress={onPressShowModal}
        />
      </>
    );
  },
  (prevProps, nextProps) => {
    if (
      nextProps.groupId == nextProps.data.index ||
      nextProps.groupId == prevProps.data.index
    ) {
      return false;
    }
    return true;
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
    backgroundColor: '#3A98FF',
  },
  modal: {
    backgroundColor: 'white',
    padding: 20,
  },
});

export default connect(
  ({words, pageWords, data}: RootState) => ({words, pageWords, data}),
  {
    getData,
    addWord,
  },
)(WordsScreen);

// {/*
//
//
