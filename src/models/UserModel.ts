import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcrypt';


export interface IUser extends Document {
  _id?: string;
    email: string;
    password: string;
    activeToken?: string;
    refreshToken?: string;
  }
  
  const UserSchema: Schema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    activeToken: {type: String, required: false, default: null},
    refreshToken: {type: String,required: false, default: null}
  },{_id: true, timestamps:true});

  UserSchema.index({email: 1})

  UserSchema.pre<IUser>('save', async function (next) {
    if (this.isModified('password')) {
      try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.password, salt);
        this.password = hashedPassword;
        next();
      } catch (error) {
        next(error);
      }
    } else {
      next();
    }
  });
  
  export default mongoose.model<IUser>('User', UserSchema);