import { Request, Response } from 'express';
import { createInterview , getInterviews ,deleteInterview} from '../services/interview.service';


export const createInterviewHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, packages, questions, expireDate, canSkip, showAtOnce } = req.body;

    // Gerekli alanların varlığını kontrol et
    if (!title || !packages || !questions || !expireDate) {
      res.status(400).json({ message: 'Title, packages, questions, and expireDate are required.' });
      return;
    }

    // İş mantığını service katmanına delega et
    const newInterview = await createInterview({
      title,
      packages,
      questions,
      expireDate,
      canSkip,
      showAtOnce,
    });

    // Başarılı yanıt
    res.status(201).json({ message: 'Interview created successfully.', data: newInterview });
  } catch (error) {
    if (error instanceof Error) {
      // Hata nesnesi bir Error ise
      res.status(500).json({ message: 'Error creating interview.', error: error.message });
    } else {
      // Error nesnesi değilse
      res.status(500).json({ message: 'Unknown error occurred.' });
    }
  }
};

export const getInterviewsHandler = async (req: Request, res: Response): Promise<void> => {
    try {
      // Tüm interview'leri al
      const interviews = await getInterviews();
  
      // Başarılı yanıt
      res.status(200).json({ message: 'Interviews fetched successfully.', data: interviews });
    } catch (error) {
      // Hatanın türünü kontrol et
      if (error instanceof Error) {
        // Hata mesajını kullan
        res.status(500).json({ message: 'Error fetching interviews.', error: error.message });
      } else {
        // Bilinmeyen hata durumu
        res.status(500).json({ message: 'An unknown error occurred while fetching interviews.' });
      }
    }
  };
  


  export const deleteInterviewHandler = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params; // ID parametrelerini al
  
    try {
      // Belirtilen ID'ye sahip interview'ü sil
      const deletedInterview = await deleteInterview(id);
  
      // Başarılı yanıt
      res.status(200).json({ message: 'Interview deleted successfully.'});
    } catch (error) {
      // Hatanın türünü kontrol et
      if (error instanceof Error) {
        // Hata mesajını kullan
        res.status(500).json({ message: 'Error deleting interview.', error: error.message });
      } else {
        // Bilinmeyen hata durumu
        res.status(500).json({ message: 'An unknown error occurred while deleting interview.' });
      }
    }
  };