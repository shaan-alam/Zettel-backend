import { Request, Response, NextFunction } from 'express';
import { AnySchema } from 'yup'

export const validateRequest = (schema: AnySchema) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    await schema.validate(req.body);
    
    return next();
  } catch(err) {
    return res.status(400).json({ message: (err as any).message })
  }
}