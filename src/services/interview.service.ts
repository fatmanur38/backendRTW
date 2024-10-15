// services/interviewService.ts
import Interview from '../models/interviews.model';
import { IInterview } from '../models/interviews.model';
import mongoose from 'mongoose';
import { QuestionPackageModel } from '../models/question-package.model'; // Paket modelini import ediyoruz
import { v4 as uuidv4 } from 'uuid';

interface CreateInterviewDTO {
  title: string;
  packages: string[]; // Paket isimleri string olarak geliyor
  questions: { question: string; time: number }[];
  expireDate: Date;
  canSkip: boolean;
  showAtOnce: boolean;
}

// Interview oluşturma servisi
export const createInterview = async (data: CreateInterviewDTO): Promise<IInterview> => {
  try {
    const questionPackages = await QuestionPackageModel.find({ title: { $in: data.packages } });
    const packageQuestions = questionPackages.flatMap(pkg => pkg.questions);
    const allQuestions = [...packageQuestions, ...data.questions];

    const interview = new Interview({
      title: data.title,
      packages: questionPackages.map(pkg => pkg._id),
      questions: allQuestions,
      expireDate: data.expireDate,
      canSkip: data.canSkip,
      showAtOnce: data.showAtOnce,
      interviewLink: uuidv4(),
    });

    const savedInterview = await interview.save();
    return savedInterview;
  } catch (error: any) {
    // Check for duplicate key error (MongoDB error code 11000)
    if (error.code === 11000 && error.keyValue.title) {
      throw new Error('Interview title must be unique. A title with this name already exists.');
    }
    throw new Error('An error occurred while creating the interview.');
  }
};

// Interview'e kullanıcı ekleme servisi
export const addUsersToInterview = async (interviewId: string, userIds: mongoose.Schema.Types.ObjectId[]): Promise<IInterview | null> => {
  if (!mongoose.Types.ObjectId.isValid(interviewId)) {
    throw new Error('Geçersiz interview ID\'si.');
  }

  try {
    const updatedInterview = await Interview.findByIdAndUpdate(
      interviewId,
      { $addToSet: { users: { $each: userIds } } }, // Aynı kullanıcıyı birden fazla eklemez
      { new: true }
    ).exec();
    
    return updatedInterview;
  } catch (error) {
    throw error;
  }
};

export const getAllInterviews = async () => {
  try {
    // Interview'leri veritabanından alıyoruz ve "packages" ve "users" alanlarını populate ediyoruz.
    const interviews = await Interview.find().populate('packages').populate('users');
    return interviews;
  } catch (error) {
    throw new Error('Interview kayıtları alınırken bir hata oluştu.');
  }
};

// Interview'i ID'ye göre silen servis
export const deleteInterview = async (interviewId: string) => {
  try {
    const deletedInterview = await Interview.findByIdAndDelete(interviewId);
    if (!deletedInterview) {
      throw new Error('Interview bulunamadı.');
    }
    return deletedInterview;
  } catch (error) {
    throw new Error('Interview silinirken bir hata oluştu.');
  }
};

// Interview'i güncelleyen servis
export const updateInterview = async (interviewId: string, data: Partial<IInterview>): Promise<IInterview | null> => {
  try {
    const updatedInterview = await Interview.findByIdAndUpdate(interviewId, data, { new: true });
    if (!updatedInterview) {
      throw new Error('Interview bulunamadı.');
    }
    return updatedInterview;
  } catch (error) {
    throw new Error('Interview güncellenirken bir hata oluştu.');
  }
};

// Interview'i ID'ye göre getiren servis
export const getInterviewById = async (interviewId: string): Promise<IInterview | null> => {
  if (!mongoose.Types.ObjectId.isValid(interviewId)) {
    throw new Error('Geçersiz interview ID\'si.');
  }

  try {
    const interview = await Interview.findById(interviewId).populate('packages').populate('users');
    if (!interview) {
      throw new Error('Interview bulunamadı.');
    }
    return interview;
  } catch (error) {
    throw new Error('Interview getirilirken bir hata oluştu.');
  }
};
