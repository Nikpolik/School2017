import * as loginActions from '../actions/login.actions';
import { Action } from 'redux';

export interface loginState {
    startedLogin: false,
    failedLogin: false,
    user: string | null;
};

const initialState: loginState = {
    startedLogin: false,
    failedLogin: false,
    user: null
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
            return Object.assign({}, state, {
                startedLogin: false,
                failedLogin: false,
                user: 'testUser'
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
