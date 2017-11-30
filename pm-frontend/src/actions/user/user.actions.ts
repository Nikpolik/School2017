import {Dispatch, Action} from 'redux';
import apiCall from '../../api/user';
import { routerActions } from 'react-router-redux';

import { AuthReq, AuthResp } from '../../../../interfaces/index';

export const LOGIN_START = 'LOGIN_START';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT = 'LOGOUT';
export const REFRESH_START = 'REFRESH_START';
export const REFRESH_SUCCESS = 'REFRESH_SUCCESS';

export interface LoginError extends Action {
    type: string;
    reason: any;
}

export interface LoginSuccess extends Action {
    type: string;
    user: string;
    token: string;
    refreshToken: string
}

export interface RefreshSuccess extends Action {
    type: string;
    token: string;
}

export function refreshStart() {
    return({
        type: REFRESH_START
    })
}

export function refreshSuccess(token: string) {
    return({
        type: REFRESH_SUCCESS,
        token
    })
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

export function loginSuccess(user: string, token: string, refreshToken: string) {
    return({
        type: LOGIN_SUCCESS,
        user,
        token,
        refreshToken
    });
}

export function logout() {
    return({
        type: LOGOUT
    })
}

export function refresh(refreshToken: string) {
    return((dispatch: Dispatch<any>) => {
        dispatch(loginStart());
        const refreshRequest: AuthReq = {
            refreshToken,
            type: 'refresh'
        }
        apiCall('http://localhost:3000/authenticate', refreshRequest, 'POST').then((response: AuthResp) => {
            if(response.success == false) {
                throw new Error(response.reason);
            }
            dispatch(refreshSuccess(response.token));
        }).catch((reason) => {
            dispatch(logout());
            dispatch(loginError(reason.message));
        });
            
    });

}

export function login(username: string, password: string) {
   return (dispatch: Dispatch<any>) => {
        dispatch(loginStart());
        const authRequest: AuthReq = {
            name: username,
            password: password,
            type: 'password'
        }
        apiCall('http://localhost:3000/authenticate', authRequest, 'POST').then((response: AuthResp) => {
            if(response.success == false) {
                throw new Error('Wrong password or username');
            }
            console.log(response);
            dispatch(loginSuccess(response.name, response.token, response.refreshToken));
            dispatch(routerActions.push('/'));            
        }).catch((reason) => {
            dispatch(loginError(reason.message));
        });
   }
};