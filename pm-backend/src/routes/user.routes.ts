import { Router } from 'express';
import {authenticate, register} from '../api/user.api';

import { UserForm } from '../interfaces';
const userRoutes: Router = Router();

userRoutes.post('/authenticate', (req, res) => {
    try {
        console.log(JSON.stringify(req.body));
        const username = req.body.username;
        const password = req.body.password;
        authenticate(username, password).then((token) => {
            res.json({
                sucess: true,
                token
            });
        }).catch((reason) => {
            res.json({
                sucess: false,
                reason: reason.message
            })
        });
    } catch (err) {
        console.log(err.message);
        res.json({
            sucess: false,
            reason: err.message
        })
    }
});

userRoutes.post('/register', (req, res) => {
    try {
        const userForm = req.body.userForm;
        console.log(userForm);
        if(!userForm.password || !userForm.confirmPassword || !userForm.username) {
            throw new Error('Invalid Form');
        }
        register({username: userForm.username, password: userForm.password, confirmPassword: userForm.confirmPassword}).then((formValidation) => {
            res.json(formValidation);
        });
    } catch(err) {
        res.json({
            sucess: false,
            reason: err.message
        })
    }

});

export {userRoutes};