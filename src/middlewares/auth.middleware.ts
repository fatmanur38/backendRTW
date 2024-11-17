import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const token = req.cookies.authToken;
  console.log('Cookies:', req.cookies); // Gelen çerezleri kontrol edin
console.log('Token:', req.cookies.authToken); // Token var mı kontrol edin

  if (!token) {
    res.status(401).json({ message: 'Access denied. No token provided.' });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY as string);
    (req as any).user = decoded; // Tipin uyduğuna emin olduktan sonra req.user'a atama yapıyoruz
    next(); // Bir sonraki middleware'e geçiliyor
  } catch (err) {
    res.status(400).json({ message: 'Invalid token' });
  }
};
