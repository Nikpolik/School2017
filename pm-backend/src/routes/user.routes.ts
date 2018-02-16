import { Router } from 'express';
import {authenticate, register, viewPublicInfo, getInvitations} from '../api/user.api';
import { checkAuth } from '../helpers/authenticate';

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
            console.log(formValidation);
            res.json(formValidation);
        });
    } catch(err) {
        res.json({
            success: false,
            errorFields: {},            
            reason: err.message
        })
    }

});

userRoutes.get('/info/:id', (req, res) => {
    viewPublicInfo(req.params.id).then((result) => {
        res.json(result);
    })
});

userRoutes.get('/invitations', checkAuth, (req, res) => {
    getInvitations(req.body.user).then((results) => {
        res.json(results);
    }).catch((err: Error) => {
        res.json({
            success: false,
            reason: err.message
        });
    });
})

export {userRoutes};