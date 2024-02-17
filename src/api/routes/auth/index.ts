// src/routes/auth.routes.ts
import { celebrate } from 'celebrate';
import express, { Router } from 'express';
import AuthController from './auth.controller';
import validationRule from './validation'

const router = Router();
export default (app: Router) => {
    app.use('/auth',router);

    router.post('/google-signin', AuthController.googleSignIn);
    router.post('/otp-signin', AuthController.otpSignIn);
    router.post('/email-password-signin', AuthController.emailPasswordSignIn);
    router.post('/email-signin/add-user',celebrate({body: validationRule.emailAddUser}),AuthController.addEmailUser)
    
}



