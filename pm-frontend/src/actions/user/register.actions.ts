import {Dispatch, Action} from 'redux';
import apiCall from '../../api/user';

export const REGISTER_START = 'REGISTER_START';
export const REGISTER_ERROR = 'REGISTER_ERROR';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const FORM_ERROR = 'FORM_ERROR';

export interface RegisterErrorAction extends Action {
    type: string,
    reason: string
};

export interface FormValidErrorAction extends Action {
    type: string;
    errorFields: {[name: string] : string}
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

export function registerError(reason: string) {
    return({
        type: REGISTER_ERROR,
        reason
    });
};

export function formValidError(errorFields: {[name: string] : string}) {
    console.log(errorFields);    
    return({
        type: FORM_ERROR,
        errorFields
    });
};

export function register(username: string, password: string, confirmPassword: string) {
    return((dispatch: Dispatch<any>) => {
        dispatch(registerStart());
        apiCall('http://localhost:3000/register', {username, password, confirmPassword}, 'POST').then((response) => {
            if(response.success == false) {
               dispatch(formValidError(response.errorFields));
               return
            }
            dispatch(registerSuccess());            
        }).catch((reason) => {
            dispatch(registerError(reason.message));
        });
    });
}