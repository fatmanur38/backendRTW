import { Router } from 'express';
import { createQuestion } from '../controllers/questionControllers'; // Doğru yol ile import

const router = Router();

// Soru oluşturma route'u (POST /questions)
router.post('/questions', createQuestion);

export default router;
