import {Dispatch, Action} from 'redux';
import apiCall from '../../api/index';

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

export function registerError(reason?: string, errorFields?: {[name: string] : string}) {
    const action: RegisterErrorAction = {
        type: REGISTER_ERROR
    }
    if(reason) {
        action.reason = reason;
    }
    if(errorFields) {
        action.errorFields = errorFields;
    }
    return(action);
};

export function register(username: string, password: string, confirmPassword: string) {
    return((dispatch: Dispatch<any>) => {
        dispatch(registerStart());
        apiCall('http://localhost:3000/register', {username, password, confirmPassword}, 'POST').then((response) => {
            if(response.success == false) {
               dispatch(registerError(response.errorFields));
               return
            }
            dispatch(registerSuccess());            
        }).catch((reason) => {
            dispatch(registerError(reason.message));
        });
    });
}