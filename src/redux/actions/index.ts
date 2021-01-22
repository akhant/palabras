import {GET_DATA, ADD_WORD} from './../const/index';
import {Dispatch} from 'redux';
import {IWord} from '../../interfaces';
// import {storage} from '../store';

export const getData = (groupId: number) => (
  dispatch: Dispatch,
  getState: any,
) => {
  const state = getState();
  console.log('state------------', state.words.length);
  // storage
  //   .load({
  //     key: 'loginState',

  //     // you can pass extra params to the sync method
  //     // see sync example below
  //     syncParams: {
  //       extraFetchOptions: {
  //         // blahblah
  //       },
  //       someFlag: true,
  //     },
  //   })
  //   .then((ret) => {
  //     // found data go to then()
  //     console.log(ret.userid);
  //   })
  //   .catch((err) => {
  //     // any exception including data not found
  //     // goes to catch()
  //     console.warn(err.message);
  //     switch (err.name) {
  //       case 'NotFoundError':
  //         // TODO;
  //         break;
  //       case 'ExpiredError':
  //         // TODO
  //         break;
  //     }
  //   });
  console.log('getData');
  dispatch({type: GET_DATA, payload: {words: state.words, groupId}});
};

export const addWord = (word: IWord) => (dispatch: Dispatch) => {
  console.log('addWord');

  // storage.save({
  //   key: 'loginState', // Note: Do not use underscore("_") in key!
  //   data: {
  //     userid: 'some userid',
  //   },
  // });

  dispatch({type: ADD_WORD, payload: {word}});
};
