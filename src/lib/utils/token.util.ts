import 'dotenv/config';
import jwt from 'jsonwebtoken';
import { envConfig } from '../config/environment.config';

export interface DecodedToken {
  id: string;
  role: string;
  iat: number;
  exp: number;
}

export const createJWT = (payload: { id: string; role: string }) => {
  const token = jwt.sign(payload, envConfig.JWT_SECRET, {
    expiresIn: envConfig.JWT_EXPIRES_IN,
  });

  return token;
};

export const verifyJWT = (token: string): DecodedToken => {
  const decoded = jwt.verify(token, envConfig.JWT_SECRET);

  return decoded as DecodedToken;
};
