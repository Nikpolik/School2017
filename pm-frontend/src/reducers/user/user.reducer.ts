import * as userActions from '../../actions/user/user.actions';
import { Action } from 'redux';
import { UserState } from '../../interfaces';

const refreshToken = localStorage.getItem('refreshToken');
const token = localStorage.getItem('token');
const name = localStorage.getItem('name');
const lastAction = localStorage.getItem('lastAction');
const stringDate = localStorage.getItem('expiresIn');
console.log(stringDate);
const expiresIn = new Date(parseInt(stringDate));



const emptyState: UserState = {
    startedLogin: false,
    failedLogin: false,
    token: '',
    name:'',
    refreshToken: '',
    expiresIn: null
}

const savedState: UserState = {
    startedLogin: false,
    failedLogin: false,
    token,
    name,
    refreshToken,
    expiresIn    
};

let initialState = emptyState;

if(lastAction !== '') {
    //if last action was less then an hour ago 
    if(new Date().getTime() - parseInt(lastAction) < 60 * 60 * 1000) {
        initialState = savedState;
    }
}

export default function loginReducer(state = initialState, action: Action) {
    switch(action.type) {
        case userActions.LOGIN_START:
            return Object.assign({}, state, {
                startedLogin: true,
                failedLogin: false,
                token: ''
            });
        case userActions.LOGIN_SUCCESS:
            const loginAction = action as userActions.LoginSuccess;
            return Object.assign({}, state, {
                startedLogin: false,
                failedLogin: false,
                token: loginAction.token,
                name: loginAction.user,
                refreshToken: loginAction.refreshToken,
                //expires in current date plus 30 minutes
                expiresIn: new Date(Date.now() + (1000 * 60 * 30))
            });
        case userActions.LOGIN_ERROR:
            return Object.assign({}, state, {
                startedLogin: false,
                failedLogin: true,
                token: ''
            });
        case userActions.REFRESH_SUCCESS:
            const refreshAction = action as userActions.RefreshSuccess;
            return Object.assign({}, state, {
                token: refreshAction.token,
                expiresIn: new Date(Date.now() + 1000 * 60 * 30)              
            });
        case userActions.LOGOUT:
            return Object.assign({}, state, emptyState);
        default:           
            return state;
    }
}
