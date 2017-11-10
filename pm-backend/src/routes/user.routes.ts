import { Router } from 'express';

const userRoutes = Router();

userRoutes.post('/authenticate', (req, res) => {
    const username = req.body.username;
});

userRoutes.post('/register', (req, res) => {
    const userForm = req.body.userForm;
    
});