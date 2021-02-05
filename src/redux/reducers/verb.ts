import {IVerb} from './../../interfaces/index';
import {GET_VERB_DATA} from './../const/index';
import {AnyAction} from 'redux';

export default (state = {}, {type, payload}: AnyAction) => {
  switch (type) {
    case GET_VERB_DATA:
      let {verbs, wordId} = payload;
      if (verbs.length) {
        return verbs.find((el: IVerb) => el.word.wordId === wordId);
      }
      return state;

    default:
      return state;
  }
};
