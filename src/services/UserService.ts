import { Document, Model } from 'mongoose';
import { Inject, Service } from 'typedi';
import { IUser } from '../models/UserModel';

@Service()
class UserService{
    constructor(
        @Inject('logger') private logger,
        @Inject('userModel') 
        private userModel: Model<IUser & Document>
        ){}

    async addUser(user: IUser){
        try{
            const createdData = await this.userModel.create<IUser>(user);
            this.logger.info('CreatedData %o',createdData)
            return createdData as IUser;
        }catch(err){
            this.logger.error('Exceptoin while creating user',err)
            throw err;
        }
    }

    async getUserByEmail(email: string){

    }

    async markUserInactive(email: string){

    }
}

export default UserService