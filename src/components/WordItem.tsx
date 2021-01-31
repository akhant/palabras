import React, {useState} from 'react';
import {FlatList, StyleSheet, View, Text, Pressable} from 'react-native';
import {connect} from 'react-redux';
import {removeWord} from '../redux/actions';

const WordItem = ({item, removeWord}: any) => {
  const [wordId, setWordId] = useState(item.wordId);
  const [groupId, setWordGroupId] = useState(item.groupId);
  const [visible, setVisible] = useState(false);

  const handleLongPress = (args: any) => {
    removeWord(wordId, groupId);
  };
  const handlePress = (args: any) => {
    setVisible(!visible);
  };
  return (
    <Pressable
      onLongPress={handleLongPress}
      onPress={handlePress}
      key={item.wordId}
      style={styles.listItem}>
      <Text style={styles.text}>{item.ru}</Text>

      {visible && (
        <>
          <Text style={styles.text}> - </Text>
          <Text style={styles.text}>{item.es}</Text>
        </>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  listItem: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#aaa',
    margin: 2,
    borderRadius: 10,
    flexWrap: 'wrap',
  },
  text: {
    fontSize: 20,
  },
});

export default connect(null, {removeWord})(WordItem);
