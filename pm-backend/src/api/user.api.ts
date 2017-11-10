import * as jswt from 'jsonwebtoken';
import { user } from '../models/index';
import config from '../config';
import { FormValidation, UserForm } from '../interfaces';

export async function authenticate(name: string, password: string): Promise<String | undefined> {
    return user.UserModel.findOne({username: name}).then((user) => {
        if(user) {
            return user.validatePassword(password);
        } else {
            throw new Error('Could not find user');
        }
    }).then((isValid) => {
        if(isValid) {
            const payload = {
                name          
            };
            return jswt.sign(payload, config.secret, {
                expiresIn: 1440
            });
        } else {
            throw new Error('Wrong password');
        }
    });
}

export async function register(userForm: UserForm): Promise<FormValidation> {
    if(userForm.password.length < 6) {
        return {
            sucess: false,
            field: ['password']
        }
    }
    if(userForm.password !== userForm.confirmPassword) {
        return {
            sucess: false,
            field: ['confirmPassword']
        };
    }
    const u = new user.UserModel({username:userForm.username, password: userForm.password});
    return u.save().then((_) => {
        return({
            sucess: true
        });
    }).catch((reason) => {
        return({
            sucess: false,
            reason
        })
    });
    
}