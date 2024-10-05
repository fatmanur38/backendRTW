// src/controllers/auth.controller.ts

import { Request, Response, NextFunction } from 'express';
import AuthService from '../services/auth.service';

class AuthController {
  // Kayıt işlemi
  public async register(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { firstName, lastName, email, phoneNumber, password } = req.body;
      const user = await AuthService.register({ firstName, lastName, email, phoneNumber, password });
      res.status(201).json({
        success: true,
        message: 'User registered successfully and is pending approval',
        data: {
          userId: user._id,
          email: user.email,
          status: user.status,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  // Giriş işlemi
  public async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password } = req.body;
      const { user, token } = await AuthService.login(email, password);
      res.status(200).json({
        success: true,
        message: 'Login successful',
        data: {
          userId: user._id,
          email: user.email,
          role: user.role,
          token,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  // Kullanıcı onayı (master_admin tarafından)
  public async approveUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.params.id;
      const user = await AuthService.approveUser(userId);
      res.status(200).json({
        success: true,
        message: 'User approved successfully',
        data: {
          userId: user._id,
          email: user.email,
          role: user.role,
          status: user.status,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new AuthController();
