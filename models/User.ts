import { Schema, model } from 'mongoose';
import { IRegisterUser } from '../interfaces/IAuth';


  const userSchema = new Schema<IRegisterUser>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique:true },
    password:{type: String, required: true}
  });

 module.exports = model<IRegisterUser>('User', userSchema);