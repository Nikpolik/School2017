import { Router } from 'express';
import {authenticate, register} from '../api/user.api';

import { RegisterReq, AuthReq, AuthResp } from '../../../interfaces/index';
const userRoutes: Router = Router();

userRoutes.post('/authenticate', (req, res) => {
    try {
        const params: AuthReq = req.body;
        console.log(params);
        authenticate(params).then((result: AuthResp | undefined) => {
            if(result) {
                res.json(result);
            }
        }).catch((reason: any) => {
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