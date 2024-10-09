// src/express.d.ts
import { JwtPayload } from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      user?: string | JwtPayload; // Burada token içeriğine göre tip belirleyebilirsiniz
    }
  }
}
