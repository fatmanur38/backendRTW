import express from 'express';
import { createInterviewHandler, getInterviewsHandler, deleteInterviewHandler } from '../controllers/interview.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = express.Router();

// Interview oluşturma route'u
router.post('/', authMiddleware, createInterviewHandler);

// GET /api/interviews
router.get('/', authMiddleware, getInterviewsHandler);

// DELETE route for interviews
router.delete('/:id', authMiddleware,  deleteInterviewHandler);

export default router;
