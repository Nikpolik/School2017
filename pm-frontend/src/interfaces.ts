import { RouterState } from 'react-router-redux';
import configure from 'redux-idle-monitor';

export interface State {
    app: {
        user: UserState;
        register: RegisterState;
        notifications: NotificationsState;
        organizations: OrganizationsState;
        current: OrganizationsCurrentState;
        invitations: InvitationsState;
    }
    router: RouterState
}

export interface UserState {
    startedLogin: false;
    failedLogin: false;
    token: string | null;
    refreshToken: string | null;
    name: string | null;
    expiresIn: Date
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

export interface OrganizationsCurrentState {
    fetching: boolean;
    _id: string;
    name: string;
    owner: string;
    description: string;
    projects: {name?: string, id: string}[];
    gotInfo: {
        members: boolean;
        admins: boolean;
    }
    members: {userId: string; name: string}[] | string[];
    admins: {userId: string; name: string| null}[];
    permissions: Number
}

export interface InvitationsState {
    fetching: boolean;
    invitations: any[]
}