import {CHANGE_INDEX} from '../const/index';
import {AnyAction} from 'redux';

export default (state = {index: 0}, {type, payload}: AnyAction) => {
  switch (type) {
    case CHANGE_INDEX:
      return {...state, index: payload.index};

    default:
      return state;
  }
};
