import express from 'express';
import { createInterviewController, addUsersToInterviewController, getAllInterviewsController, deleteInterviewController, updateInterviewController } from '../controllers/interview.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
const router = express.Router();

// Interview oluşturma
router.post('/interviews',authMiddleware, createInterviewController);

// Kullanıcıları interview'e ekleme
router.put('/interviews/:interviewId/users', addUsersToInterviewController);

// Tüm interview'leri çekme
router.get('/interviews', authMiddleware, getAllInterviewsController);

// Interview silme
router.delete('/interviews/:interviewId', authMiddleware, deleteInterviewController);

// Interview güncelleme
router.put('/interviews/:interviewId', authMiddleware, updateInterviewController);

export default router;
