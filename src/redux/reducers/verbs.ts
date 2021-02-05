import {IVerb} from './../../interfaces/index';
import {GET_VERB_DATA, ADD_VERB, REMOVE_VERB} from './../const/index';
import {AnyAction} from 'redux';

export default (state: any = [], {type, payload}: AnyAction) => {
  switch (type) {
    case ADD_VERB:
      return [...state, payload.verb];

    case REMOVE_VERB:
      for (let verb of state) {
        if (verb.word.wordId == payload.wordId) {
          return state.filter((el: IVerb) => el.word.wordId != payload.wordId);
        }
      }
      return state;
    default:
      return state;
  }
};
