export interface RegisterReq {
    username: string;
    password: string;
    confirmPassword: string;
    age?: number;
}

export interface AuthReq {
    type: string;
    name?: string;
    password?: string;
    refreshToken?: string;
}

export interface AuthResp {
    success: boolean;
    reason?: string;
    token?: string;
    name?: string;
    refreshToken?: string;
}

export interface RegisterResp {
    success: boolean;
    errorFields?: {[name: string] : string};
    reason?: string;
};

