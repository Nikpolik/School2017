import {Dispatch, Action} from 'redux';
import * as userApi from '../api/user';

export const LOGIN_START = 'LOGIN_START';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

export interface LoginFail extends Action {
    type: string;
    reason: any;
}

export interface LoginSuccess extends Action {
    type: string;
    user: string
}

export function loginStart() {
    return({
        type: 'LOGIN_START'
    });
}

export function loginFail(reason: any): LoginFail {
    return({
        type: 'LOGIN_FAIL',
        reason        
    });
}

export function loginSuccess(user: string) {
    return({
        type: 'LOGIN_SUCESS',
        user
    });
}

export function login(username: string, password: string) {
   return (dispatch: Dispatch<any>) => {
        dispatch(loginStart());
        userApi.login(username, password).then((response) => {
            console.log(response);
            dispatch(loginSuccess('fuck off'));            
        }).catch((reason) => {
            dispatch(loginFail(reason));
        });
   }
};