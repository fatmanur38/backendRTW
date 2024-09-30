import { Router } from 'express';
import { generateLink, verifyLink } from './controllers/interview';

export const router = Router();

// Route to generate a temporary JWT link
router.post('/generate-link');

// Route to verify the token and show the interview page
router.get('/interview');