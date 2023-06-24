import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

export interface UserDocument extends mongoose.Document {
  fullName: string,
  email: string,
  password: string,
  avatar: string
}

const UserSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    required: true
  },
})

const User = mongoose.model('User', UserSchema);
export default User;