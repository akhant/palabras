import {GET_DATA, ADD_WORD, REMOVE_WORD} from './../const/index';
import {Dispatch} from 'redux';
import {IWord} from '../../interfaces';

export const getData = (groupId: number) => (
  dispatch: Dispatch,
  getState: any,
) => {
  const state = getState();

  console.log('getData', groupId);
  dispatch({type: GET_DATA, payload: {words: state.words, groupId}});
};

export const addWord = (word: IWord) => (dispatch: Dispatch) => {
  console.log('addWord');
  dispatch({type: ADD_WORD, payload: {word}});
};

export const removeWord = (wordId: string, groupId: string) => (
  dispatch: Dispatch,
) => {
  console.log('removeWord');
  dispatch({type: REMOVE_WORD, payload: {wordId, groupId}});
};
