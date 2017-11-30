import * as registerActions from '../../actions/user/register.actions';
import { Action } from 'redux';
import { RegisterState } from '../../interfaces';

const initialState: RegisterState = {
    startedRegister: false,
    failedRegister: false,
    errorFields: {}
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
            const registerFail = action as registerActions.RegisterErrorAction;    
            return Object.assign({}, state, {
                startedRegister: false,
                failedRegister: registerFail.reason
            });
        case registerActions.FORM_ERROR:
            const validationError = action as registerActions.FormValidErrorAction
            return Object.assign({}, state, {
                startedRegister: false,
                failedRegister: false,
                errorFields: validationError.errorFields
            });
        default:
            return initialState;
    }
}
