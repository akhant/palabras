import React, {useState} from 'react';
import {FlatList, StyleSheet, View, Text, Pressable} from 'react-native';
import {connect} from 'react-redux';
import {removeWord} from '../redux/actions';

const WordItem = ({item, removeWord}: any) => {
  const [wordId, setWordId] = useState(item.wordId);
  const [groupId, setWordGroupId] = useState(item.groupId);

  const handleLongPress = (args: any) => {
    removeWord(wordId, groupId);
  };
  return (
    <Pressable
      onLongPress={handleLongPress}
      key={item.wordId}
      style={styles.listItem}>
      <Text>{item.ru}</Text>
      <Text> - </Text>
      <Text>{item.es}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  listItem: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 5,
  },
});

export default connect(null, {removeWord})(WordItem);
