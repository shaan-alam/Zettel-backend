import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../services/jwt.service'

const verifyTokenFromHeaders = async (req: Request, res: Response, next: NextFunction) => {
  let payload: Record<string, any>;
  
  try {
    const token = req.headers.authorization?.split(" ")[1];
    
    if (token) {
      payload = await verifyToken(token) as any;
      res.locals.userId = payload._id;
      return next();
    }

  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: "Unauthorised access!" });
  }
}

export default verifyTokenFromHeaders