import { Request, Response } from 'express';
import * as QuestionPackageService from '../services/questionPackage.service';

// Soru paketi oluşturma controller'ı
export const createQuestionPackage = async (req: Request, res: Response): Promise<void> => {
    try {
        const { title, questions } = req.body;

        if (!title || !questions) {
            res.status(400).json({ message: 'Title and questions are required.' });
            return;
        }

        // Her bir sorunun 'time' alanının integer olup olmadığını kontrol et
        for (const question of questions) {
            if (!Number.isInteger(question.time)) {
                res.status(400).json({ message: `Time for question "${question.question}" must be an integer.` });
                return;
            }
        }

        // Aynı title var mı kontrol et
        const newQuestionPackage = await QuestionPackageService.createQuestionPackage(title, questions);
        res.status(201).json({ message: 'Question package created successfully.', data: newQuestionPackage });
    } catch (error: any) {
        if (error.message === 'A question package with this title already exists.') {
            res.status(400).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Error creating question package.', error });
        }
    }
};


// Tüm soru paketlerini getirme controller'ı
export const getQuestionPackages = async (req: Request, res: Response): Promise<void> => {
    try {
        const questionPackages = await QuestionPackageService.getQuestionPackages();
        res.status(200).json({ message: 'Question packages retrieved successfully.', data: questionPackages });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving question packages.', error });
    }
};

// ID'ye göre soru paketi getirme controller'ı
export const getQuestionPackageById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const questionPackage = await QuestionPackageService.getQuestionPackageById(id);

        if (!questionPackage) {
            res.status(404).json({ message: 'Question package not found.' });
            return;
        }

        res.status(200).json({ message: 'Question package retrieved successfully.', data: questionPackage });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving question package.', error });
    }
};

// Soru paketi silme controller'ı
export const deleteQuestionPackage = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const deletedPackage = await QuestionPackageService.deleteQuestionPackage(id);

        if (!deletedPackage) {
            res.status(404).json({ message: 'Question package not found.' });
            return;
        }

        res.status(200).json({ message: 'Question package deleted successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting question package.', error });
    }
};

// Soru paketi güncelleme controller'ı
export const updateQuestionPackage = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { title, questions } = req.body;

        if (!title || !questions) {
            res.status(400).json({ message: 'Title and questions are required.' });
            return;
        }

        for (const question of questions) {
            if (!Number.isInteger(question.time)) {
                res.status(400).json({ message: `Time for question "${question.question}" must be an integer.` });
                return;
            }
        }

        const updatedPackage = await QuestionPackageService.updateQuestionPackage(id, title, questions);

        if (!updatedPackage) {
            res.status(404).json({ message: 'Question package not found.' });
            return;
        }

        res.status(200).json({ message: 'Question package updated successfully.', data: updatedPackage });
    } catch (error) {
        res.status(500).json({ message: 'Error updating question package.', error });
    }
};
