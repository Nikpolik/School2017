import { RouterState } from 'react-router-redux';

export interface State {
    app: {
        login: LoginState
    }
    router: RouterState
}

export interface LoginState {
    startedLogin: false,
    failedLogin: false,
    user: string | null;
};