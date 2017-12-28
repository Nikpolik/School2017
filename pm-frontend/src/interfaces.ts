import { RouterState } from 'react-router-redux';
import configure from 'redux-idle-monitor';

export interface State {
    app: {
        user: UserState,
        register: RegisterState,
        notifications: NotificationsState,
        orgnizations: OrginizationsState
    }
    router: RouterState
}

export interface UserState {
    startedLogin: false;
    failedLogin: false;
    token: string | null;
    refreshToken: string | null;
    name: string | null;
};

export interface RegisterState {
    startedRegister: false;
    errorFields: {[name: string] : string};
    failedRegister: false;
    reason: string
}

export interface OrginizationsState {
    fetching: boolean;
    organizations: any[]
}

export interface NotificationsState {
    currentId: number;
    notifications: {[id: string] : {message: string, type: string}};
}