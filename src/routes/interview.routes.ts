import express from 'express';
import { createInterviewHandler, getInterviewsHandler, deleteInterviewHandler } from '../controllers/interview.controller';

const router = express.Router();

// Interview oluşturma route'u
router.post('/', createInterviewHandler);

// GET /api/interviews
router.get('/', getInterviewsHandler);

// DELETE route for interviews
router.delete('/:id', deleteInterviewHandler);

export default router;
