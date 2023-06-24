import jwt from 'jsonwebtoken';

const SECRET = `${process.env.JWT_SECRET}`;

export const signToken = async (payload: Record<string, any>) => {
  return await jwt.sign(payload, SECRET);
}

export const verifyToken = async (token: string) => {
  return await jwt.verify(token, SECRET);
}