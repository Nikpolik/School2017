import { Router } from 'express';
import {authenticate, register} from '../api/user.api';

import { UserForm } from '../interfaces';
const userRoutes: Router = Router();

userRoutes.post('/authenticate', (req, res) => {
    try {
        const username = req.body.username;
        const password = req.body.password;
        authenticate(username, password).then((token) => {
            res.json({
                success: true,
                token,
                username
            });
        }).catch((reason) => {
            res.json({
                success: false,
                reason: reason.message
            })
        });
    } catch (err) {
        console.log(err.message);
        res.json({
            success: false,
            reason: err.message
        })
    }
});

userRoutes.post('/register', (req, res) => {
    try {
        const userForm = req.body;
        console.log(userForm);
        register({username: userForm.username, password: userForm.password, confirmPassword: userForm.confirmPassword}).then((formValidation) => {
            res.json(formValidation);
        });
    } catch(err) {
        console.log(err.message);
        res.json({
            success: false,
            errorFields: {},            
            reason: err.message
        })
    }

});

export {userRoutes};