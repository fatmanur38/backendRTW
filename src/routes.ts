import { Router } from 'express';
import { generateLink, verifyLink } from './utils/jwt';

export const router = Router();

router.post('/generate-link', generateLink);


router.get('/interview', verifyLink);  