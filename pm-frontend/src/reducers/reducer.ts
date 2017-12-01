import { combineReducers } from 'redux';

import userReducer from './user/user.reducer';
import registerReducer from './user/register.reducer';
import NotificationsReducer from './helpers/notifications.reducer';
// const appReducer = combineReducers

const appReducer = combineReducers({
    user: userReducer,
    register: registerReducer,
    notifications: NotificationsReducer
});

export default appReducer;