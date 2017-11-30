import * as jswt from 'jsonwebtoken';
import { user } from '../models/index';
import config from '../config';
import { FormValidation, UserForm } from '../interfaces';

export async function authenticate(name: string, password: string): Promise<String | undefined> {
    return user.UserModel.findOne({username: name}).then((user) => {
        if(user) {
            return ({isValid: user.validatePassword(password), user});
        } else {
            throw new Error('Could not find user');
        }
    }).then((result) => {
        if(result.isValid) {
            const payload = {
                name          
            };
            const token = jswt.sign(payload, config.secret, {
                expiresIn: 1440
            });
            result.user.token = token;
            result.user.save();
            return token;
        } else {
            throw new Error('Wrong password');
        }
    });
}

export async function register(userForm: UserForm): Promise<FormValidation> {
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
    const userResult = await user.UserModel.findOne({username: userForm.username});
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
    const u = new user.UserModel({username:userForm.username, password: userForm.password});
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