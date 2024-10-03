import { Request, Response } from 'express';
import { QuestionModel } from '../models/Question';

// Soru oluşturma fonksiyonu
export const createQuestion = async (req: Request, res: Response) => {
    try {
        const { question, categoryName, timeLimit } = req.body;

        if (!question || !categoryName || !timeLimit) {
            res.status(400).json({ message: 'All fields are required: question, categoryName, and timeLimit' });
            return;
        }

        const newQuestion = new QuestionModel({
            question,
            categoryName,
            timeLimit,
        });

        const savedQuestion = await newQuestion.save();
        res.status(201).json(savedQuestion);
    } catch (error) {
        console.error('Error creating question:', error);
        res.status(500).json({ message: 'Error creating question', error });
    }
};

// Soruları çekme fonksiyonu
export const getQuestions = async (req: Request, res: Response) => {
    try {
        const questions = await QuestionModel.find(); // Tüm soruları çek
        res.status(200).json(questions);
    } catch (error) {
        console.error('Error fetching questions:', error);
        res.status(500).json({ message: 'Error fetching questions', error });
    }
};


// Soru güncelleme fonksiyonu
export const updateQuestion = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { question, categoryName, timeLimit } = req.body;

        // Gerekli alanları kontrol et
        if (!question || !categoryName || !timeLimit) {
            res.status(400).json({ message: 'All fields are required: question, categoryName, and timeLimit' });
            return;
        }

        // Soru güncelle
        const updatedQuestion = await QuestionModel.findByIdAndUpdate(
            id, 
            { question, categoryName, timeLimit }, 
            { new: true } // Güncellenmiş belgeyi döndür
        );

        if (!updatedQuestion) {
            res.status(404).json({ message: 'Question not found' });
            return;
        }

        res.status(200).json(updatedQuestion);
    } catch (error) {
        console.error('Error updating question:', error);
        res.status(500).json({ message: 'Error updating question', error });
    }
};

// Soru silme fonksiyonu
export const deleteQuestion = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        // Soru sil
        const deletedQuestion = await QuestionModel.findByIdAndDelete(id);

        if (!deletedQuestion) {
            res.status(404).json({ message: 'Question not found' });
            return;
        }

        res.status(200).json({ message: 'Question deleted successfully' });
    } catch (error) {
        console.error('Error deleting question:', error);
        res.status(500).json({ message: 'Error deleting question', error });
    }
};
