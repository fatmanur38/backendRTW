import { Router } from 'express';
import { createQuestion, getQuestions, updateQuestion, deleteQuestion } from '../controllers/questionControllers'; // Doğru yol ile import

const router = Router();

// Soru oluşturma route'u (POST /questions)
router.post('/questions', createQuestion);

// Soruları çekme route'u (GET /questions)
router.get('/questions', getQuestions);

// Soruyu güncelleme route'u (PUT /questions/:id)
router.put('/questions/:id', updateQuestion);

// Soruyu silme route'u (DELETE /questions/:id)
router.delete('/questions/:id', deleteQuestion);

export default router;
