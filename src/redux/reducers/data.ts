import {COUNT_RENDER} from './../const/index';
import {CHANGE_INDEX} from '../const/index';
import {AnyAction} from 'redux';

export default (state = {index: 0, counter: 0}, {type, payload}: AnyAction) => {
  switch (type) {
    case CHANGE_INDEX:
      return {...state, index: payload.index};

    case COUNT_RENDER:
      return {...state};

    default:
      return state;
  }
};
