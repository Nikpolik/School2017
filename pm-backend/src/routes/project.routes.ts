import { Router } from 'express';
import { checkAuth } from '../helpers/authenticate';

export const projectRoutes: Router = Router();

projectRoutes.use(checkAuth);

projectRoutes.post('/test', (req, res) => {
    res.json(req.body);
});