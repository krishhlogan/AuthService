import { NextFunction, Request, Response } from 'express';
import Container from 'typedi';
import { IExtendedRequest } from '../../../interfaces/IExtendedRequest';
import LoggerInstance from '../../../loaders/logger';
import { IUser } from '../../../models/UserModel';
import AuthService from '../../../services/AuthService';
import { APIResponse } from '../../../utility';

const GoogleAuthController = {
  googleSignIn: async (req: IExtendedRequest, res: Response, next: NextFunction) => {
    // Implement Google Sign-in logic
  },
};

export default GoogleAuthController;
