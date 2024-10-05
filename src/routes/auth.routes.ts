// src/routes/auth.routes.ts

import { Router } from 'express';
import AuthController from '../controllers/auth.controller';
import { authenticate, authorize } from '../middlewares/auth.middleware';

const router = Router();

// Kayıt rotası
router.post('/register', AuthController.register);

// Giriş rotası
router.post('/login', AuthController.login);

// Kullanıcı onayı rotası (Sadece master_admin erişebilir)
router.put(
  '/approve/:id',
  authenticate,
  authorize(['master_admin']),
  AuthController.approveUser
);

export default router;
