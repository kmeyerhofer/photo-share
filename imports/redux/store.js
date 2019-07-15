import { createStore, combineReducers } from 'redux';
import errorReducer from './reducers/errorReducer.js';
import commentReducer from './reducers/commentReducer.js';
import userReducer from './reducers/userReducer.js';

export default createStore(combineReducers({ errorReducer, commentReducer, userReducer }));
