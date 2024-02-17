// src/routes/auth.routes.ts
import { celebrate } from 'celebrate';
import express, { Router } from 'express';
import EmailAuthController from './emailAuth.controller';
import validationRule from './validation'

const router = Router();
export default (app: Router) => {
    app.use('/email-auth',router);

    router.post('/signin', EmailAuthController.emailPasswordSignIn);
    router.post('/add-user',celebrate({body: validationRule.emailAddUser}),EmailAuthController.addEmailUser)
    
}



