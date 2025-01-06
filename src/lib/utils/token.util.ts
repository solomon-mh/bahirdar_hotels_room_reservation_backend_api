import 'dotenv/config';
import jwt from 'jsonwebtoken';

export interface DecodedToken {
  id: string;
  role: string;
  iat: number;
  exp: number;
}

export const createJWT = (payload: { id: string; role: string }) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  return token;
};

export const verifyJWT = (token: string): DecodedToken => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

  return decoded as DecodedToken;
};
