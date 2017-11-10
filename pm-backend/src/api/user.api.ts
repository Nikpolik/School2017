import * as jswt from 'jsonwebtoken';
import { user } from '../models/index';
import config from '../config';
import { FormValidation } from '../interfaces';

export function authenticate(name: string, password: string): Promise<String | undefined> {
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
        }
    });
}

export function register(userForm: user.User, confirmPassword: string): FormValidation {
    if(userForm.password !== confirmPassword) {
        return {
            sucess: false,
            field: ['password']
        };
    }
    
}