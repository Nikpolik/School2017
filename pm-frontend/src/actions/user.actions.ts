import {Dispatch, Action} from 'redux';
import apiCall from '../api/user';
import { routerActions } from 'react-router-redux';

export const LOGIN_START = 'LOGIN_START';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT = 'LOGOUT';

export interface LoginError extends Action {
    type: string;
    reason: any;
}

export interface LoginSuccess extends Action {
    type: string;
    user: string
}

export function loginStart() {
    return({
        type: LOGIN_START
    });
}

export function loginError(reason: any) {
    return({
        type: LOGIN_ERROR,
        reason        
    });
}

export function loginSuccess(user: string) {
    return({
        type: LOGIN_SUCCESS,
        user
    });
}

export function logout() {
    return({
        type: LOGOUT
    })
}

export function login(username: string, password: string) {
   return (dispatch: Dispatch<any>) => {
        dispatch(loginStart());
        apiCall('http://localhost:3000/authenticate', {username, password}, 'POST').then((response) => {
            if(response.success == false) {
                throw new Error('Wrong password or username');
            }
            dispatch(loginSuccess(response.token));
            dispatch(routerActions.push('/'));            
        }).catch((reason) => {
            dispatch(loginError(reason.message));
        });
   }
};