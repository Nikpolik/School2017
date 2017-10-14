import * as passport from 'passport';
import { Strategy } from 'passport-local';
import User from '../models/user';

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());