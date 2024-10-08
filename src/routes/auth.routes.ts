// src/routes/auth.routes.ts
import express from 'express';
import { AuthController } from '../controllers/auth.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = express.Router();
const authController = new AuthController();

router.post('/login', authMiddleware, authController.login);
router.post('/logout', authController.logout);

export default router;
