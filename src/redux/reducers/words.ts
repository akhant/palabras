import {AnyAction} from 'redux';

export default (state = [], {type, payload}: AnyAction) => {
  switch (type) {
    default:
      return state;
  }
};
