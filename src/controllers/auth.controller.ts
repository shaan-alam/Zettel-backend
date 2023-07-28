import { Request, Response } from 'express';
import User, { UserDocument } from '../models/User.model';
import { comparePassword, hashPassword } from '../services/auth.service';
import { omit } from 'lodash';
import { signToken } from '../services/jwt.service'

interface AuthRequest extends Request {
  body: {
    email: string,
    password: string,
    confirmPassword: string,
    fullName: string
  }
}

export const signUp = async (req: AuthRequest, res: Response) => {
  const { email, password,  fullName } = req.body;
  
  if (res.locals.user) {
    return res.status(400).json({ message: 'A user with that email already exists!'})
  }

  try {
    const avatar = `https://avatars.dicebear.com/api/initials/${fullName}.svg`;
    const hashedPassword = await hashPassword(password);
    const newUser = await new User({ fullName, email, password: hashedPassword, avatar, });
    const user = await newUser.save();

    const token = await signToken({ _id: user._id });

    return res.status(201).json({ user: omit(user.toJSON(), 'password'), token })
  } catch (err) {
    res.status(500).json({ err: (err as any).message})
  } 
}

interface LoginInterface extends Request {
  body: {
    email: string,
    password: string
  }
}

export const signIn = async (req: LoginInterface, res: Response & { locals: { user: UserDocument }}) => {
  console.log('signing in')
  if (!res.locals.user) {
    return res.status(404).json({ message: "No user with that email exists!" });
  }   
  const { password } = req.body;

  try {
    const isValid = await comparePassword(password, res.locals.user.password)
    if (!isValid) {
      return res.status(400).json({ message: "Invalid Password" });      
    }

    const token = await signToken({ _id: res.locals.user._id });
    res.json({ user: omit(res.locals.user.toJSON(), 'password'), token })
  } catch (err) {
    res.json({ message: (err as any).message })
  }
}

