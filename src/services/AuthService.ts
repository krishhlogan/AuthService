// src/services/auth.service.ts
import { Inject, Service } from 'typedi';
import { IUser } from '../models/UserModel';
import UserService from './UserService';

@Service()
class AuthService {
  // Implement authentication services
  constructor(
    @Inject('logger') private logger,
    private userService: UserService
  ){

  }

  public async addUser(user: IUser): Promise<IUser> {
    try {
      const addedUser = await this.userService.addUser(user);
      this.logger.info('Added user',addedUser)
      return addedUser;
    } catch (error) {
      console.error('Error during login:', error);
      throw error;
    }
  }
}

export default AuthService;
