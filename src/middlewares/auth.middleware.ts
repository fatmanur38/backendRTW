// src/middlewares/auth.middleware.ts

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/user.model';
import { ErrorHandler } from '../utils/error.handler';

interface AuthRequest extends Request {
  user?: IUser;
}

export const authenticate = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(new ErrorHandler(401, 'No token provided'));
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };
    const user = await User.findById(decoded.id);
    if (!user) {
      return next(new ErrorHandler(401, 'User not found'));
    }
    req.user = user;
    next();
  } catch (err) {
    return next(new ErrorHandler(401, 'Invalid token'));
  }
};

export const authorize = (roles: Array<'master_admin' | 'admin'>) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return next(new ErrorHandler(403, 'Forbidden'));
    }
    next();
  };
};
