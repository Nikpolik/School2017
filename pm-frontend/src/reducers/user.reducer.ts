import * as userActions from '../actions/user.actions';
import { Action } from 'redux';
import { UserState } from '../interfaces';

const token = localStorage.getItem('user');
const name = localStorage.getItem('name');

const emptyState: UserState = {
    startedLogin: false,
    failedLogin: false,
    token: '',
    name:''
}

const initialState: UserState = {
    startedLogin: false,
    failedLogin: false,
    token,
    name
};

export default function loginReducer(state = initialState, action: Action) {
    switch(action.type) {
        case userActions.LOGIN_START:
            return Object.assign({}, state, {
                startedLogin: true,
                failedLogin: false,
                token: ''
            });
        case userActions.LOGIN_SUCCESS:
            const loginAction = action as userActions.LoginSuccess;
            console.log(loginAction.user);
            return Object.assign({}, state, {
                startedLogin: false,
                failedLogin: false,
                token: loginAction.token,
                name: loginAction.user
            });
        case userActions.LOGIN_ERROR:
            return Object.assign({}, state, {
                startedLogin: false,
                failedLogin: true,
                token: ''
            });
        case userActions.LOGOUT:
            return Object.assign({}, state, emptyState);
        default:           
            return state;
    }
}
