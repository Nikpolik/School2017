export interface State {
    app: {
        login: LoginState
    }
}

export interface LoginState {
    startedLogin: false,
    failedLogin: false,
    user: string | null;
};