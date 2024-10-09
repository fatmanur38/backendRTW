// src/controllers/auth.controller.ts
import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import jwt from 'jsonwebtoken';

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  // Login işlemi
  public login = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;
    const isLoginSuccessful = await this.authService.verifyCredentials(email, password);

    if (isLoginSuccessful) {
      // JWT oluşturma
      const token = jwt.sign({ email }, process.env.SECRET_KEY as string, {
        expiresIn: '1h',
      });

      // Token'ı cookie'ye `HttpOnly` olarak ekleme
      res.cookie('authToken', token, {
        httpOnly: true, // Sadece sunucu üzerinden erişim sağlar
        secure: process.env.NODE_ENV === 'production', // Production'da `true` yapın
        sameSite: 'strict', // CSRF koruması için
        maxAge: 60 * 60 * 24000, // 1 saat
      });

      res.status(200).json({ message: 'Login successful!', token });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  };

  // Logout işlemi
  public logout = (req: Request, res: Response): void => {
    res.clearCookie('authToken'); // Cookie'yi temizle
    res.status(200).json({ message: 'Logout successful!' });
  };
}
