import mongoose from 'mongoose';

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
  },
  avatar: {
    type: String,
    required: true
  },
})

const User = mongoose.model('User', UserSchema);
export default User;