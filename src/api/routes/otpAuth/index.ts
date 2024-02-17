// src/routes/auth.routes.ts
import { celebrate } from 'celebrate';
import express, { Router } from 'express';
import OtpAuthController from './otpAuth.controller';
import validationRule from './validation'

const router = Router();
export default (app: Router) => {
    app.use('/otp-auth',router);
    
    router.post('/signin', OtpAuthController.otpSignIn);
    
}



