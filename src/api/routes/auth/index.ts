// src/routes/auth.routes.ts
import express, { Router } from 'express';
import AuthController from './auth.controller';

const router = express.Router();
export default (app: Router) => {
    app.use('/auth',router);
    router.post('/google-signin', AuthController.googleSignIn);
    router.post('/otp-signin', AuthController.otpSignIn);
    router.post('/email-password-signin', AuthController.emailPasswordSignIn);
    
}



