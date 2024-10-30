// src/routes/userRoutes.ts

import express from 'express';
import userController from '../controllers/user.controller';

const router = express.Router();

// Yeni kullanıcı oluşturma rotası
router.post('/users', (req, res) => userController.createUser(req, res));

// Kullanıcıyı ID'ye göre alma rotası
router.get('/users/:id', (req, res) => userController.getUserById(req, res));

// Tüm kullanıcıları çekme rotası
router.get('/users', (req, res) => userController.getAllUsers(req, res));

// Kullanıcıyı güncelleme rotası
router.put('/users/:id', (req, res) => userController.updateUser(req, res));

// Kullanıcı video URL'sini güncelleme
router.put('/users/:id/video-url', userController.updateUserVideoUrl);

// Diğer rotaları buraya ekleyebilirsiniz (örneğin, DELETE /users/:id)

export default router;
