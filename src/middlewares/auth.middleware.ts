import User, { UserDocument } from "../models/User.model";
import { Request, Response, NextFunction } from 'express';

export const getUser = async (req: Request, res: Response & { locals: { user: UserDocument }}, next: NextFunction) => {
  try {
    const user = await User.findOne({ email: req.body.email })

    res.locals.user = user as UserDocument
    return next();
  } catch(err) {
    return res.status(400).json({ message: "No user with that email"})
  }
}