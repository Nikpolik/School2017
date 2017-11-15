import { RouterState } from 'react-router-redux';

export interface State {
    app: {
        user: UserState,
        register: RegisterState
    }
    router: RouterState
}

export interface UserState {
    startedLogin: false;
    failedLogin: false;
    token: string | null;
    name: string | null;
};

export interface RegisterState {
    startedRegister: false;
    fields: {[name: string] : string};
    failedRegister: false;
}