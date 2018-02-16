import { Router } from 'express';

import { checkAuth } from '../helpers/authenticate';
import * as api from '../api/organization.api';
import { organization } from '../models/index';

const organizationRoutes: Router = Router();

organizationRoutes.use(checkAuth);

organizationRoutes.post('/create', (req, res) => {
    api.createOrganization(req.body.user, req.body.name,  req.body.description).then((result) => {
        if(result.success) {
            res.json(result);
        }
    }).catch((err: Error) => {
        res.json({
            success: false,
            reason: err.message
        });
    });
});

organizationRoutes.get('/:id', (req, res) => {
    api.getSingleOrganization(req.params.id, req.body.user).then((result) => {
        res.json(result);
    }).catch((err: Error) => {
        res.json({
            success: false,
            reason: err.message
        });
    });
});

organizationRoutes.get('/', (req, res) => {
    api.getOrganizations(req.body.user, req.query.role).then((result) => {   
        res.json(result);
    }).catch((err: Error) => {
        res.json({
            success: false,
            reason: err.message
        });
    });
})

organizationRoutes.post('/:id/create', (req, res) => {
    api.createProject(req.params.id, req.body.name, req.body.manager, req.body.user).then((result) => {
        res.json(result);
    }).catch((err: Error) => {
        res.json({
            success: false,
            reason: err.message
        });
    });
});

organizationRoutes.post('/:id/invite', (req, res) => {
    api.inviteToOrganization(req.params.id, req.body.role, req.body.invitedUser, req.body.user).then((result) => {
        res.json(result);
    }).catch((err: Error) => {
        res.json({
            success: false,
            reason: err.message
        });
    });
});

organizationRoutes.post('/:id/accept', (req, res) => {
    api.acceptInvite(req.params.id, req.body.user).then((result) => {
        res.json(result);
    }).catch((err: Error) => {
        res.json({
            success: false,
            reason: err.message
        })
    }) 
})

organizationRoutes.post('/:id/edit', (req, res) => {
    const { user, ...rest } = req.body;
    api.editInfo(req.params.id, user, rest).then((result) => {
        res.json(result);
    }).catch((err) => {
        res.json({
            success: 'false',
            reason: err.message
        })
    })
});

export { organizationRoutes };