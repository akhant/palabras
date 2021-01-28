import {GET_DATA, ADD_WORD, REMOVE_WORD} from './../const/index';
import {AnyAction} from 'redux';
import {IGroup} from '../../interfaces';

export default (state: IGroup[] = [], {type, payload}: AnyAction) => {
  switch (type) {
    case GET_DATA:
      let words = payload.words;
      if (words.length) {
        payload.words;
      }
      return state;

    case ADD_WORD:
      return state.map((group) => {
        if ((group.groupId = payload.word.groupId)) {
          group.words?.push(payload.word);
          return group;
        }
      });

    case REMOVE_WORD:
      for (let group of state) {
        if (group.groupId === payload.groupId) {
          let newWords = group.words?.filter(
            (word) => word.wordId != payload.wordId,
          );
          group.words = newWords;

          break;
        }
      }
      return state;

    default:
      return state;
  }
};
