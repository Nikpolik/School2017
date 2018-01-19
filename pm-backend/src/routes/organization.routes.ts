import { Router } from 'express';

import { checkAuth } from '../helpers/authenticate';
import { createOrganization, getOrganizations, getSingleOrganization } from '../api/organization.api';
import { organization } from '../models/index';

const organizationRoutes: Router = Router();

organizationRoutes.use(checkAuth);

organizationRoutes.post('/create', (req, res) => {
    try {
        createOrganization(req.body.user, req.body.name,  req.body.description).then((result) => {
            if(result.success) {
                res.json(result);
            }
        });
    } catch (err) {
        res.send({
            success: false,
            reason: err.message
        });
    }
});

organizationRoutes.get('/:id', (req, res) => {
    console.log('------#------')
    console.log(req.params.id);
    getSingleOrganization(req.params.id, req.body.user).then((result) => {
        res.json(result);
    });
});

organizationRoutes.get('/', (req, res) => {
    getOrganizations(req.body.user, req.query.role).then((result) => {   
        console.log('finished?')
        res.json(result);
    })
})

export { organizationRoutes };