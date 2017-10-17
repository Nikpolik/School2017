import { Request, Response, NextFunction } from 'express';

export function checkAuth (req: Request, res: Response, next: NextFunction, secureList: Array<String>) {
    console.log('checkAuth ' + req.url);

    // don't serve /secure to those not logged in
    // you should add to this list, for each and every secure url
    if (req.url === '/secure' && (!req.session || !req.session.authenticated)) {
        res.render('unauthorised', { status: 403 });
        return;
    }

    next();
}
