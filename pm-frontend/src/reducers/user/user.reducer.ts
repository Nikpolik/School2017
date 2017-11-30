import * as userActions from '../../actions/user/user.actions';
import { Action } from 'redux';
import { UserState } from '../../interfaces';

const refreshToken = localStorage.getItem('refreshToken');
const name = localStorage.getItem('name');
const expiresIn = localStorage.getItem('expiresIn');

const emptyState: UserState = {
    startedLogin: false,
    failedLogin: false,
    token: '',
    name:'',
    refreshToken: ''
}

const initialState: UserState = {
    startedLogin: false,
    failedLogin: false,
    token: '',
    name,
    refreshToken    
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
            return Object.assign({}, state, {
                startedLogin: false,
                failedLogin: false,
                token: loginAction.token,
                name: loginAction.user,
                refreshToken: loginAction.refreshToken
            });
        case userActions.LOGIN_ERROR:
            return Object.assign({}, state, {
                startedLogin: false,
                failedLogin: true,
                token: ''
            });
        case userActions.REFRESH_SUCCESS:
            const refreshAction = action as userActions.RefreshSuccess;
            return Object.assign({}, state, {
                token: refreshAction.token
            });
        case userActions.LOGOUT:
            return Object.assign({}, state, emptyState);
        default:           
            return state;
    }
}
