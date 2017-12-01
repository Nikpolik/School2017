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
            return Object.assign({}, state, {
                startedLogin: true,
                failedRegister: false,
            });
        case registerActions.REGISTER_SUCCESS:
            return Object.assign({}, state, {
                startedRegister: false,
                failedRegister: false,
                errorFields: {}
            });
        case registerActions.REGISTER_ERROR:
            const validationError = action as registerActions.RegisterErrorAction
            const newState: any = {}
            if(validationError.errorFields) {
                newState.errorFields = validationError;
            }
            if(validationError.reason) {
                newState.reason = validationError;
            }
            return Object.assign({}, state, {
                startedRegister: false,
                failedRegister: true,
                ...newState
            });
        default:
            return initialState;
    }
}
