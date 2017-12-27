import { Router } from 'express';

import { checkAuth } from '../helpers/authenticate';
import { createOrganization } from '../api/organization.api';
import { organization } from '../models/index';

const organizationRoutes: Router = Router();

organizationRoutes.use(checkAuth);

organizationRoutes.post('/create', (req, res) => {
    try {
        createOrganization(req.body.id, req.body.name).then((result) => {
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

export { organizationRoutes };