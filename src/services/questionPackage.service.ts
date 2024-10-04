import { QuestionPackageModel } from '../models/question-package.model';

// Soru paketi oluşturma servisi
export const createQuestionPackage = async (title: string, questions: any[]) => {
    // Soru sayısını hesapla
    const questionCount = questions.length;

    // Yeni bir soru paketi oluştur
    const newQuestionPackage = new QuestionPackageModel({
        title,
        questionCount,
        questions,
    });

    // Veritabanına kaydet
    return await newQuestionPackage.save();
};

// Tüm soru paketlerini getirme servisi
export const getQuestionPackages = async () => {
    return await QuestionPackageModel.find();
};

// ID'ye göre soru paketi getirme servisi
export const getQuestionPackageById = async (id: string) => {
    return await QuestionPackageModel.findById(id);
};

// Soru paketi silme servisi
export const deleteQuestionPackage = async (id: string) => {
    return await QuestionPackageModel.findByIdAndDelete(id);
};

// Soru paketi güncelleme servisi
export const updateQuestionPackage = async (id: string, title: string, questions: any[]) => {
    const questionCount = questions.length;
    return await QuestionPackageModel.findByIdAndUpdate(
        id,
        { title, questionCount, questions },
        { new: true }
    );
};
