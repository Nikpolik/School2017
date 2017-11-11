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
        type: 'LOGIN_SUCCESS',
        user
    });
}

export function login(username: string, password: string) {
   return (dispatch: Dispatch<any>) => {
        dispatch(loginStart());
        userApi.login(username, password).then((response) => {
            if(response.sucess == false) {
                throw new Error('Wrong password or username');
            }
            dispatch(loginSuccess(response.token));            
        }).catch((reason) => {
            dispatch(loginFail(reason.message));
        });
   }
};