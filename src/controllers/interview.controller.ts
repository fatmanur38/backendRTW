import { Request, Response } from 'express';
import { createInterview, addUsersToInterview, getAllInterviews, deleteInterview, updateInterview } from '../services/interview.service';

// Interview oluşturma controller'ı (Mevcut kod)
export const createInterviewController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, packages, questions, expireDate, canSkip, showAtOnce } = req.body;

    // Interview oluşturmak için servisi çağırma
    const interview = await createInterview({
      title,
      packages,
      questions,
      expireDate,
      canSkip,
      showAtOnce,
    });

    res.status(201).json({
      message: 'Interview başarıyla oluşturuldu.',
      interview,
    });
  } catch (error: any) {
    res.status(500).json({
      message: 'Interview oluşturulurken bir hata meydana geldi.',
      error: error.message,
    });
  }
};

// Interview'e kullanıcı ekleme controller'ı
export const addUsersToInterviewController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { interviewId } = req.params;
    const { userIds } = req.body; // Kullanıcı ID'lerinin dizisi

    if (!Array.isArray(userIds) || userIds.length === 0) {
      res.status(400).json({ message: 'Kullanıcı ID\'leri geçersiz.' });
      return;
    }

    // Kullanıcıları Interview'e eklemek için servisi çağırma
    const updatedInterview = await addUsersToInterview(interviewId, userIds);

    if (!updatedInterview) {
      res.status(404).json({ message: 'Interview bulunamadı.' });
      return;
    }

    res.status(200).json({
      message: 'Kullanıcılar başarıyla eklendi.',
      updatedInterview,
    });
  } catch (error: any) {
    res.status(500).json({
      message: 'Interview\'e kullanıcı eklenirken bir hata meydana geldi.',
      error: error.message,
    });
  }
};

// Tüm interview'leri dönen controller
export const getAllInterviewsController = async (req: Request, res: Response): Promise<void> => {
  try {
    // Servisi çağırarak tüm interview'leri alıyoruz
    const interviews = await getAllInterviews();
    
    res.status(200).json({
      message: 'Tüm interview kayıtları başarıyla alındı.',
      interviews,
    });
  } catch (error: any) {
    res.status(500).json({
      message: 'Interview kayıtları alınırken bir hata oluştu.',
      error: error.message,
    });
  }
};

// Interview'i ID'ye göre silen controller
export const deleteInterviewController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { interviewId } = req.params;

    // Interview'i silmek için servisi çağırıyoruz
    const deletedInterview = await deleteInterview(interviewId);

    res.status(200).json({
      message: 'Interview başarıyla silindi.',
      deletedInterview,
    });
  } catch (error: any) {
    res.status(500).json({
      message: 'Interview silinirken bir hata oluştu.',
      error: error.message,
    });
  }
};

// Interview'i ID'ye göre güncelleyen controller
export const updateInterviewController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { interviewId } = req.params;
    const data = req.body; // Güncellemek için gönderilen veri

    // Interview'i güncellemek için servisi çağırıyoruz
    const updatedInterview = await updateInterview(interviewId, data);

    res.status(200).json({
      message: 'Interview başarıyla güncellendi.',
      updatedInterview,
    });
  } catch (error: any) {
    res.status(500).json({
      message: 'Interview güncellenirken bir hata oluştu.',
      error: error.message,
    });
  }
};
