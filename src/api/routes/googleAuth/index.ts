// src/routes/auth.routes.ts
import { celebrate } from 'celebrate';
import express, { Router } from 'express';
import GoogleAuthController from './googleAuth.controller';
import validationRule from './validation'

const router = Router();
export default (app: Router) => {
    app.use('/google-auth',router);

    router.post('/signin', GoogleAuthController.googleSignIn);
    
}



