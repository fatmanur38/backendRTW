import express from 'express';
import { createQuestionPackage, getQuestionPackages ,deleteQuestionPackage, updateQuestionPackage} from '../controllers/question-package.controller';

const router = express.Router();

// Soru paketi oluşturma route'u
router.post('/', createQuestionPackage);

router.get('/', getQuestionPackages);

router.delete('/:id', deleteQuestionPackage);

// Soru paketi güncelleme
router.put('/:id', updateQuestionPackage);

export default router;
