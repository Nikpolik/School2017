import { RouterState } from 'react-router-redux';
import configure from 'redux-idle-monitor';

export interface State {
    app: {
        user: UserState,
        register: RegisterState,
        notifications: NotificationsState,
        organizations: OrganizationsState
    }
    router: RouterState
}

export interface UserState {
    startedLogin: false;
    failedLogin: false;
    token: string | null;
    refreshToken: string | null;
    name: string | null;
    expiresIn: Date | null;
};

export interface RegisterState {
    startedRegister: false;
    errorFields: {[name: string] : string};
    failedRegister: false;
    reason: string
}

export interface OrganizationsState {
    fetching: boolean;
    owner: any[];
    member: any[];
    admin: any[];
}

export interface NotificationsState {
    currentId: number;
    notifications: {[id: string] : {message: string, type: string}};
}

export interface Organization {
    id: string;
    name: string;
    description: string;
}