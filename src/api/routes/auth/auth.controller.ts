import { NextFunction, Request, Response } from 'express';
import Container from 'typedi';
import { IExtendedRequest } from '../../../interfaces/IExtendedRequest';
import LoggerInstance from '../../../loaders/logger';
import { IUser } from '../../../models/UserModel';
import AuthService from '../../../services/AuthService';
import { APIResponse } from '../../../utility';

const AuthController = {
  googleSignIn: async (req: IExtendedRequest, res: Response, next: NextFunction) => {
    // Implement Google Sign-in logic
  },

  otpSignIn: async (req: IExtendedRequest, res: Response, next: NextFunction) => {
    // Implement OTP Sign-in logic
  },

  emailPasswordSignIn: async (req: IExtendedRequest, res: Response,  next: NextFunction) => {
    // Implement Email/Password Sign-in logic
  },
  addEmailUser: async (req: IExtendedRequest, res: Response, next: NextFunction) => {
    try{
      LoggerInstance.info('starting addEmailUser')
      const user = req.body as IUser;
      const authService = Container.get(AuthService);
      const createdUser = await authService.addUser(user);
      return APIResponse.success(req, res, 'Successfully added user',{user: createdUser})
    }catch(err){
      LoggerInstance.error('Exception in adding email user',err)
      next(err);
    }
  }
};

export default AuthController;
