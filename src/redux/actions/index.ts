import {IVerb} from './../../interfaces/index';
import {fetchAndParseVerb} from './../../utils/index';
import {
  GET_DATA,
  ADD_WORD,
  REMOVE_WORD,
  GET_VERB_DATA,
  ADD_VERB,
  REMOVE_VERB,
  VERBS_GROUP_INDEX,
} from './../const/index';
import {Dispatch} from 'redux';
import {IWord} from '../../interfaces';
import NetInfo from '@react-native-community/netinfo';

export const getData = (groupId: number) => (
  dispatch: Dispatch,
  getState: any,
) => {
  const state = getState();
  dispatch({type: GET_DATA, payload: {words: state.words, groupId}});
};

export const addWord = (word: IWord) => async (
  dispatch: Dispatch,
  getState: any,
) => {
  const state = getState();
  if (word.groupId === VERBS_GROUP_INDEX) {
    let verb: IVerb;
    const {isConnected} = await NetInfo.fetch();
    if (isConnected) {
      verb = await fetchAndParseVerb(word);
      dispatch({type: ADD_VERB, payload: {verb}});
    } else {
      dispatch({
        type: ADD_VERB,
        payload: {verb: {word, form: {}, formData: false}},
      });
    }
  }
  dispatch({type: ADD_WORD, payload: {word}});

  dispatch({
    type: GET_DATA,
    payload: {words: state.words, groupId: word.groupId},
  });
};

export const removeWord = (wordId: string, groupId: string) => (
  dispatch: Dispatch,
) => {
  dispatch({type: REMOVE_WORD, payload: {wordId, groupId}});
  if (groupId === VERBS_GROUP_INDEX) {
    dispatch({type: REMOVE_VERB, payload: {wordId, groupId}});
    //TODO implement remove word at reducer
  }
};

export const getVerbData = (wordId: string) => (
  dispatch: Dispatch,
  getState: any,
) => {
  const {verbs} = getState();
  dispatch({type: GET_VERB_DATA, payload: {wordId, verbs}});
};
