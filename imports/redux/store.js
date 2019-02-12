import { createStore, combineReducers } from 'redux';
import errorReducer from './reducers/errorReducer.js';
//
// const initialState = {
//   errors: [],
// };

export default createStore(errorReducer/*, initialState*/);
