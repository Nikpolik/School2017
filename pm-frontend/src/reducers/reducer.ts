import { combineReducers } from 'redux';

import loginReducer from './login.reducer';

// const appReducer = combineReducers

const appReducer = combineReducers({login: loginReducer});
export default appReducer;