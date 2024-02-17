import { Router } from 'express';
import emailAuth from './routes/emailAuth';
import otpAuth from './routes/otpAuth';
import googleAuth from './routes/googleAuth';

export default () => {
    const app = Router();
    emailAuth(app);
    otpAuth(app);
    googleAuth(app);
    return app;
}