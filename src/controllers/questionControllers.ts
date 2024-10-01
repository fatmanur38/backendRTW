import { Request, Response } from 'express';
import { QuestionModel } from '../models/Question';

export const createQuestion = async (req: Request, res: Response) => {
    try {
        const { question, categoryName, timeLimit } = req.body;

        if (!question || !categoryName || !timeLimit) {
            res.status(400).json({ message: 'All fields are required: question, categoryName, and timeLimit' });
            return;  // Yanıt gönderdikten sonra geri dön
        }

        const newQuestion = new QuestionModel({
            question,
            categoryName,
            timeLimit,
        });

        const savedQuestion = await newQuestion.save();

        // Yanıt gönder ve geri dön
        res.status(201).json(savedQuestion);
    } catch (error) {
        console.error('Error creating question:', error);
        res.status(500).json({ message: 'Error creating question', error });
    }
};
