// src/utils/generateToken.ts

import jwt from 'jsonwebtoken';
import { IUser } from '../models/user.model';

const generateToken = (user: IUser): string => {
  const payload = {
    id: user._id,
    email: user.email,
    role: user.role,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: '1h',
  });

  return token;
};

export default generateToken;
