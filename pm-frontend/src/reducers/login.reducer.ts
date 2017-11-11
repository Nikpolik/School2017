import * as loginActions from '../actions/login.actions';
import { Action } from 'redux';
import { LoginState } from '../interfaces';
const user = localStorage.getItem('user');

const initialState: LoginState = {
    startedLogin: false,
    failedLogin: false,
    user
};

export default function loginReducer(state = initialState, action: Action) {
    switch(action.type) {
        case loginActions.LOGIN_START:
            return Object.assign({}, state, {
                startedLogin: true,
                failedLogin: false,
                user: null
            });
        case loginActions.LOGIN_SUCCESS:
            const loginAction = action as loginActions.LoginSuccess;
            console.log(loginAction.user);
            return Object.assign({}, state, {
                startedLogin: false,
                failedLogin: false,
                user: loginAction.user
            });
        case loginActions.LOGIN_FAIL:
            return Object.assign({}, state, {
                startedLogin: false,
                failedLogin: true,
                user: null
            });
        default:
            return initialState;
    }
}
