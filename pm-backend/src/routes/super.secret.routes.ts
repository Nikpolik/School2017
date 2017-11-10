import { Router } from 'express';
import { checkAuth } from '../helpers/authenticate';

const secretRoutes: Router = Router();


secretRoutes.use(checkAuth);

secretRoutes.get('/test', (req, res) => {
    res.send({
        sucess: 'true',
        message: 'Clap'
    });
});

export  {secretRoutes};
