import {GET_DATA, ADD_WORD, REMOVE_WORD} from './../const/index';
import {AnyAction} from 'redux';
import {IWord} from '../../interfaces';

export default (state: IWord[] = [], {type, payload}: AnyAction) => {
  switch (type) {
    case GET_DATA:
      let res = [];
      const words = payload.words;

      if (words.length) {
        for (let i = 0; i < words.length; i++) {
          if (words[i].groupId == payload.groupId) {
            res = words[i].words;
            break;
          }
        }

        return res;
      }
      return state;

    case REMOVE_WORD:
      return state.filter((word) => word.wordId !== payload.wordId);

    default:
      return state;
  }
};
