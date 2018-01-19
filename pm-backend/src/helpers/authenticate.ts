import { Request, Response, NextFunction } from 'express';
import * as jnwt from 'jsonwebtoken';

import config from '../config';

export function checkAuth (req: Request, res: Response, next: NextFunction) {
    console.log('checkAuth ' + req.url);
    // don't serve /secure to those not logged in
    // you should add to this list, for each and every secure url
    const token = req.headers['x-access-token'] || req.body.token || req.query.token;
    if(token) {
        try {
            jnwt.verify(token, config.secret, {}, (e, decoded: any) => {
               if(e) {
                   res.status(403).send({
                    success: false,
                    reason: e.message
                   });
               } else {
                   req.body.user = decoded.id;
                   next();
               } 
            });
        } catch(e) {
            //console.log(e.message);
        }
    } else {
        res.status(403).send({
            success: false,
            reason: 'no api token'
        });
    }
}
