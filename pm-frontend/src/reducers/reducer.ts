import { combineReducers } from 'redux';

import userReducer from './user.reducer';
import registerReducer from './register.reducer';

// const appReducer = combineReducers

const appReducer = combineReducers({
    user: userReducer,
    register: registerReducer
});

export default appReducer;