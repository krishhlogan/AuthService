// src/services/auth.service.ts
import { Service } from 'typedi';
import UserModel, { IUser } from '../models/UserModel';

@Service()
class AuthService {
  // Implement authentication services

  public async loginUser(email: string, password: string): Promise<IUser | null> {
    // Your login logic here
    return null
  }
}

export default AuthService;
