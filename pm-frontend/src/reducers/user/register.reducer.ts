import * as registerActions from '../../actions/user/register.actions';
import { Action } from 'redux';
import { RegisterState } from '../../interfaces';

const initialState: RegisterState = {
    startedRegister: false,
    failedRegister: false,
    errorFields: {},
    reason: ''
};

export default function loginReducer(state = initialState, action: Action) {
    switch(action.type) {
        case registerActions.REGISTER_START:
            return {
                ...state,
                startedLogin: true,
                failedRegister: false,
            }
        case registerActions.REGISTER_SUCCESS:
            return {
                ...state,
                startedRegister: false,
                failedRegister: false,
                errorFields: {}
            }
        case registerActions.REGISTER_ERROR:
            const validationError = action as registerActions.RegisterErrorAction
            const newState: any = {}
            console.log(validationError.reason);
            if(validationError.errorFields) {
                newState.errorFields = validationError.errorFields;
            }
            if(validationError.reason) {
                newState.reason = validationError;
            }
            return {
                ...state,
                startedRegister: false,
                failedRegister: true,
                ...newState
            }
        default:
            return initialState;
    }
}
