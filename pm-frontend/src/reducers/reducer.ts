import { combineReducers } from 'redux';

import loginReducer from './login.reducer';

// const appReducer = combineReducers

const appReducer = loginReducer;
export default appReducer;