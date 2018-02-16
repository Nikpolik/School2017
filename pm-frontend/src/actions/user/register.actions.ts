import {Dispatch, Action} from 'redux';
import apiCall from '../../api/index';
import { notify } from '../helpers/notifications.actions';
import { routerActions } from 'react-router-redux';

export const REGISTER_START = 'REGISTER_START';
export const REGISTER_ERROR = 'REGISTER_ERROR';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';


export interface RegisterErrorAction extends Action {
    type: string;
    errorFields?: {[name: string] : string}
    reason?: string
}

export function registerStart() {
    return({
        type: REGISTER_START
    });
};

export function registerSuccess() {
    return({
        type: REGISTER_SUCCESS
    });
}

export function registerError(error: {reason?: string, errorFields?: {[name: string] : string}}) {
    const action: RegisterErrorAction = {
        type: REGISTER_ERROR
    }
    if(error.reason) {
        action.reason = error.reason;
    }
    if(error.errorFields) {
        action.errorFields = error.errorFields;
    }
    return(action);
};

export function register(username: string, password: string, confirmPassword: string) {
    return((dispatch: Dispatch<any>) => {
        dispatch(registerStart());
        apiCall('user/register', 'POST', false, {username, password, confirmPassword}).then((response) => {
            console.log(response);
            if(response.success == false) {
               dispatch(registerError({errorFields: response.errorFields}));
               return
            }
            dispatch(registerSuccess());
            dispatch(notify("Account Registered Successfully", "success"));
            dispatch(routerActions.push('/login'));            
        }).catch((reason) => {
            dispatch(registerError({reason: reason.message}));
        });
    });
}
