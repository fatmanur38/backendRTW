import express from 'express';
import { createQuestionPackage, getQuestionPackages ,deleteQuestionPackage, updateQuestionPackage,getQuestionPackageById} from '../controllers/question-package.controller';

const router = express.Router();

// Soru paketi oluşturma route'u
router.post('/', createQuestionPackage);

router.get('/', getQuestionPackages);

// ID'ye göre soru paketi getirme route'u
router.get('/:id', getQuestionPackageById); // Yeni route

router.delete('/:id', deleteQuestionPackage);

// Soru paketi güncelleme
router.put('/:id', updateQuestionPackage);

export default router;
