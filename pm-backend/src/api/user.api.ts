import * as jswt from 'jsonwebtoken';
import { User, UserModel } from '../models/user.model';
import config from '../config';
import { AuthReq, AuthResp, RegisterReq, RegisterResp} from '../../../interfaces/index';
import { OrganizationModel } from '../models/organization/organization.model';

export async function authenticate(params: AuthReq): Promise<AuthResp> {
     return validateAuthParams(params).then((result) => {
        if(!result.isValid) {
            throw new Error('Invalid Password');
        }
        const payload = {
            id: result.user._id
        }
        const token = jswt.sign(payload, config.secret, {
            expiresIn: '30m'
        });
        let refreshToken = '';
        if(result.getRefresh) {
            refreshToken = jswt.sign(payload, config.secret, {
                expiresIn: '1d'
            });
        }
        return {success: true, refreshToken, token, name: result.user.username}
    });
}

export async function register(userForm: RegisterReq): Promise<RegisterResp> {
    if(!userForm.username) {
        return {
            success: false,
            errorFields: {username: 'Username is missing'}
        }
    } else if(!userForm.password) {
        return {
            success: false,
            errorFields: {password: 'Password is missing'}
        }
    } else if(!userForm.confirmPassword) {
        return {
            success: false,
            errorFields: {confirmPassword: 'Password confirmation is missing'}
        }
    }  
    const userResult = await UserModel.findOne({username: userForm.username});
    if(userResult) {
        return {
            success: false,
            errorFields: {username: 'Username already exists'}
        }
    }
    if(userForm.password.length < 6) {
        return {
            success: false,
            errorFields: {password: 'Password not long enough'}
        }
    }
    if(userForm.password !== userForm.confirmPassword) {
        return {
            success: false,
            errorFields: {confirmPassword: 'Passwords did not match'}
        };
    }
    const u = new UserModel({username:userForm.username, password: userForm.password});
    return u.save().then((_) => {
        return({
            success: true
        });
    }).catch((reason) => {
        return({
            success: false,
            reason
        })
    });
    
}

async function validateAuthParams(params: AuthReq): Promise<{isValid: boolean; user: any; getRefresh: boolean}>{
    if(params.type === 'refresh' && params.refreshToken) {
        const decoded: any = jswt.verify(params.refreshToken, config.secret);
        console.log(decoded);
        if(typeof decoded === 'string') {
            throw new Error(decoded);
        }
        return UserModel.findById(decoded.id).then((user) => {
            if(!user) {
                throw new Error('Could not find user');
            }
            return({isValid: true, user, getRefresh: false});
        });
    } else if (params.type === 'password' && params.name) {
        return UserModel.findOne({username: params.name}).then((user) => {
            if(!params.password) {
                throw new Error('Invalid Password');
            }
            if(!user) {
                throw new Error('Could not find user');
            }
            return user.validatePassword(params.password);
        }).then((user) => {
            if(user) {
                return {isValid: true, user, getRefresh: true}
            }
            throw new Error('Invalid Password');
        })
    }
    console.log('out');
    throw new Error('Could not find auth method');
}

export async function viewPublicInfo(id: string): Promise<{success: boolean, info?: any, reason?: string}> {
    return UserModel.findById(id).then((result) => {
        if(result) {
            return {
                success: true,
                info: {
                    name: result.username
                }
            }
        }
        return {
            success: false,
            reason: 'User not found'
        }
    });
}

export async function getInvitations(user: string): Promise<{success: boolean, invitations?: any, reason?: string}> {
    return UserModel.findById(user).then( async (user) => {
        if(!user) {
            throw new Error('User not found, that should be impossible')
        }
        const invitations = []
        for(let invitation of user.invitations) {
            let org = await OrganizationModel.findById(invitation.organization);
            if(!org) {
                throw new Error('Organization doesnt exist');
            }
            let name = org.name;
            console.log('test')
            invitations.push({
                id: invitation.organization,
                role: invitation.role,
                name
            }); 
        }
        console.log('done');
        return {
            success: true,
            invitations
        }
    });
}