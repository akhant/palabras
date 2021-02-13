import React, {useEffect} from 'react';
import {StyleSheet, View, Text, Dimensions} from 'react-native';
import {connect} from 'react-redux';
import {RootState} from '../redux/reducers';
import {IVerb, IWordsScreenProps} from '../interfaces';
import {getData, addWord, removeWord, getVerbData} from '../redux/actions';
import {FAB, Modal, TextInput, Button, Title} from 'react-native-paper';
import WordItem from './WordItem';
import {SwipeListView} from 'react-native-swipe-list-view';
import {ScrollView} from 'react-native-gesture-handler';
import {renderFullTimeName} from '../utils';
import {VERBS_GROUP_INDEX} from '../redux/const';

const WordsScreen: React.FC<IWordsScreenProps> = React.memo(
  ({
    pageWords,
    getVerbData,
    removeWord,
    data,
    addWord,
    verb,
    getData,
    groupId,
  }) => {
    const [visibleAdd, setVisibleAdd] = React.useState(false);
    const [visibleVerb, setVisibleVerb] = React.useState(false);
    const [textRu, setTextRu] = React.useState('');
    const [textEs, setTextEs] = React.useState('');
    const [stateGroupId, setStateGroupId] = React.useState(groupId);

    useEffect(() => {
      if (stateGroupId === data.index.toString()) {
        getData(groupId);
      }
    }, [data.index]);

    const onPressShowModal = () => {
      setVisibleAdd(true);
    };

    const hideModal = () => setVisibleAdd(false);

    const onPressAddWord = () => {
      // if empty data
      if (!textRu || !textEs) return;
      setTextEs('');
      setTextRu('');
      if (groupId && pageWords?.length) {
        let last = pageWords[pageWords.length - 1];
        addWord({
          ru: textRu,
          es: textEs,
          groupId: stateGroupId,
          //@ts-ignore
          wordId: last ? (+last.wordId + 1).toString() : stateGroupId + 0,
        });
        setVisibleAdd(false);
      } else {
        return;
      }
    };

    const showVerbModal = (wordId: string) => {
      if (wordId == `${VERBS_GROUP_INDEX}0`) return;
      getVerbData(wordId);
      setVisibleVerb(true);
    };

    const hideModalVerb = () => {
      setVisibleVerb(false);
    };

    const renderItem = ({item}: any) => {
      return <WordItem showVerbModal={showVerbModal} item={item} />;
    };
    const renderHiddenItem = ({item}: any) => {
      return <View></View>;
    };

    const onSwipeAction = (wordId: any) => {
      removeWord(wordId, stateGroupId as string);
    };

    const renderVerbForms = (verb: IVerb) => {
      if (!verb.formData)
        return <Text style={styles.errorDataText}>No data</Text>;
      const {form} = verb;
      let result = [];
      let i = 0;
      for (let key in form) {
        if (typeof form[key] === 'string') {
          //infinitivo, gerundio, participio
          result.push(
            <Title style={styles.title} key={i++}>
              {renderFullTimeName(key)}
            </Title>,
          );
          result.push(
            <Text key={i++} style={styles.text}>
              {form[key]}
            </Text>,
          );
        } else {
          if (typeof form[key]?.tu === 'string') {
            let timeTitle = (
              <Title style={styles.title} key={i++}>
                {renderFullTimeName(key)}
              </Title>
            );
            let values = [];
            for (let value in form[key]) {
              //conditional, imperativo...

              values.push(
                <View key={i++} style={styles.tbody}>
                  <Text style={styles.text}>{value}</Text>
                  <Text style={styles.text}>{form[key][value]}</Text>
                </View>,
              );
            }
            result.push(timeTitle);
            result.push(values);
          } else {
            for (let time in form[key]) {
              //presente, preterio...
              let timeTitle = (
                <Title style={styles.title} key={i++}>
                  {renderFullTimeName(time, key === 'subjuntivo')}
                </Title>
              );
              let values = [];

              for (let value in form[key][time]) {
                values.push(
                  <View key={i++} style={styles.tbody}>
                    <Text style={styles.text}>{value}</Text>
                    <Text style={styles.text}>{form[key][time][value]}</Text>
                  </View>,
                );
              }
              result.push(timeTitle);
              result.push(values);
            }
          }
        }
      }
      return result;
    };

    return (
      <>
        {pageWords && (
          <SwipeListView
            keyExtractor={(item, i) => {
              //@ts-ignore
              return item.wordId.toString();
            }}
            data={pageWords}
            disableRightSwipe={true}
            renderItem={renderItem}
            renderHiddenItem={renderHiddenItem}
            onRowOpen={onSwipeAction}
            rightOpenValue={-Dimensions.get('window').width}
          />
        )}
        <Modal
          visible={visibleAdd}
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
        {/* 
//@ts-ignore */}
        <Modal
          visible={visibleVerb}
          onDismiss={hideModalVerb}
          style={styles.modalVerbWrapper}
          contentContainerStyle={styles.modalVerb}>
          <ScrollView contentContainerStyle={styles.scrollView}>
            {renderVerbForms(verb)}
            {/*             
//@ts-ignore */}
            <Button
              color="#3A98FF"
              onPress={hideModalVerb}
              style={styles.modalVerbBtn}>
              x
            </Button>
          </ScrollView>
        </Modal>
      </>
    );
  },
  (prevProps, nextProps) => {
    //filter updates on not important screens
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
  btnOpenDrawerMenu: {
    position: 'absolute',
    top: 6,
    left: 10,
    fontSize: 50,
  },
  btnOpenDrawerMenuContent: {
    fontSize: 50,
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
  modalVerb: {
    backgroundColor: 'white',
  },
  modalVerbWrapper: {
    marginTop: 0,
  },
  modalVerbBtn: {
    position: 'absolute',
    top: 5,
    right: 5,
    borderRadius: 50,
  },
  scrollView: {
    alignItems: 'center',
  },
  tbody: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    alignSelf: 'stretch',
    justifyContent: 'space-around',
  },
  text: {
    fontSize: 18,
    fontFamily: 'Octicons',
  },
  title: {
    marginTop: 20,
  },
  errorDataText: {
    flex: 1,
    fontSize: 20,
  },
});

export default connect(
  ({words, pageWords, data, verb}: RootState) => ({
    words,
    pageWords,
    data,
    verb,
  }),
  {
    getData,
    addWord,
    removeWord,
    getVerbData,
  },
)(WordsScreen);
