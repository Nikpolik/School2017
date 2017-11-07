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

function login(state = initialState, action: Action) {
    switch(action.type) {
        case loginActions.LOGIN_START:
            return Object.assign({}, state, {
                startedLogin: true,
                failedLogin: false
            });
        case loginActions.
    }
}
