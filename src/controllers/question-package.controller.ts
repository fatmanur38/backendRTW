import { Request, Response } from 'express';
import { QuestionPackageModel } from '../models/question-package.model';

// Soru paketi oluşturma fonksiyonu
export const createQuestionPackage = async (req: Request, res: Response): Promise<void> => {
    try {
        const { title, questions } = req.body;

        // Title ve questions kontrolü
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

        // Soru sayısını hesapla
        const questionCount = questions.length;

        // Yeni bir soru paketi oluştur
        const newQuestionPackage = new QuestionPackageModel({
            title,
            questionCount,
            questions,
        });

        // Veritabanına kaydet
        await newQuestionPackage.save();

        // Başarılı yanıt
        res.status(201).json({ message: 'Question package created successfully.', data: newQuestionPackage });
    } catch (error) {
        // Hata yanıtı
        res.status(500).json({ message: 'Error creating question package.', error });
    }
};




// Soru paketlerini getirme fonksiyonu
export const getQuestionPackages = async (req: Request, res: Response): Promise<void> => {
    try {
        // Tüm soru paketlerini veritabanından çek
        const questionPackages = await QuestionPackageModel.find();

        // Eğer paketler bulunursa, başarılı bir yanıt gönder
        res.status(200).json({ message: 'Question packages retrieved successfully.', data: questionPackages });
    } catch (error) {
        // Hata durumunda yanıt gönder
        res.status(500).json({ message: 'Error retrieving question packages.', error });
    }
};

// Soru paketi silme fonksiyonu
export const deleteQuestionPackage = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        // ID ile soru paketini bul ve sil
        const deletedPackage = await QuestionPackageModel.findByIdAndDelete(id);

        if (!deletedPackage) {
            res.status(404).json({ message: 'Question package not found.' });
            return;
        }

        // Başarılı yanıt
        res.status(200).json({ message: 'Question package deleted successfully.' });
    } catch (error) {
        // Hata yanıtı
        res.status(500).json({ message: 'Error deleting question package.', error });
    }
};

// Soru paketi güncelleme fonksiyonu
export const updateQuestionPackage = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { title, questions } = req.body;

        // Güncellenecek alanları kontrol et
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

        // Soru sayısını güncelle
        const questionCount = questions.length;

        // Soru paketini güncelle
        const updatedPackage = await QuestionPackageModel.findByIdAndUpdate(
            id,
            { title, questionCount, questions },
            { new: true } // Güncellenmiş veriyi döndür
        );

        if (!updatedPackage) {
            res.status(404).json({ message: 'Question package not found.' });
            return;
        }

        // Başarılı yanıt
        res.status(200).json({ message: 'Question package updated successfully.', data: updatedPackage });
    } catch (error) {
        // Hata yanıtı
        res.status(500).json({ message: 'Error updating question package.', error });
    }
};

