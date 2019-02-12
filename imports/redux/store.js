import { createStore } from 'redux';
import errorReducer from './reducers/errorReducer.js';

export default createStore(errorReducer);
