import { combineReducers } from 'redux';

import userReducer from './user/user.reducer';
import registerReducer from './user/register.reducer';
import NotificationsReducer from './helpers/notifications.reducer';
import OrganizationsReducer from './organization/organizations.reducer';
import OrganizationsCurrentReducer from './organization/organizations.current.reducer';
// const appReducer = combineReducers

const appReducer = combineReducers({
    user: userReducer,
    register: registerReducer,
    notifications: NotificationsReducer,
    organizations: OrganizationsReducer,
    current: OrganizationsCurrentReducer
});

export default appReducer;