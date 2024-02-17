// src/controllers/auth.controller.ts
import { Request, Response } from 'express';
import AuthService from '../../../services/AuthService';

const AuthController = {
  googleSignIn: async (req: Request, res: Response) => {
    // Implement Google Sign-in logic
  },

  otpSignIn: async (req: Request, res: Response) => {
    // Implement OTP Sign-in logic
  },

  emailPasswordSignIn: async (req: Request, res: Response) => {
    // Implement Email/Password Sign-in logic
  },
};

export default AuthController;
