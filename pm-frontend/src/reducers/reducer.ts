import { combineReducers } from 'redux';

import userReducer from './user/user.reducer';
import registerReducer from './user/register.reducer';

// const appReducer = combineReducers

const appReducer = combineReducers({
    user: userReducer,
    register: registerReducer
});

export default appReducer;