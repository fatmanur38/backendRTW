import express from 'express';
import { createQuestionPackage, getQuestionPackages ,deleteQuestionPackage, updateQuestionPackage,getQuestionPackageById} from '../controllers/question-package.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = express.Router();

// Soru paketi oluşturma route'u
router.post('/', authMiddleware, createQuestionPackage);

router.get('/', authMiddleware, getQuestionPackages);

// ID'ye göre soru paketi getirme route'u
router.get('/:id', authMiddleware, getQuestionPackageById); // Yeni route

router.delete('/:id', authMiddleware, deleteQuestionPackage);

// Soru paketi güncelleme
router.put('/:id', authMiddleware, updateQuestionPackage);

export default router;
