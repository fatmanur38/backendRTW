import { QuestionPackageModel } from '../models/question-package.model';
import Interview from '../models/interviews.model'; // Interview modelini içeri aktarmayı unutmayın

export const createInterview = async (interviewData: any) => {
  const { title, packages, questions, expireDate, canSkip, showAtOnce } = interviewData;

  // Paket başlıklarına göre ObjectId'leri bulalım
  const packageIds = await QuestionPackageModel.find({ title: { $in: packages } }).select('_id questions');

  // Eğer paketlerden bazıları bulunamazsa hata fırlat
  if (!packageIds || packageIds.length !== packages.length) {
    throw new Error('Some packages are not found');
  }

  // Paketlerden soruları al ve ana questions dizisine ekle
  const packageQuestions = packageIds.reduce((acc: any[], pkg: any) => {
    return acc.concat(pkg.questions); // Her paket için soruları birleştir
  }, []);

  // Ana questions dizisi ile paketlerden gelen soruları birleştir
  const allQuestions = [...packageQuestions, ...questions];

  // Yeni bir interview oluştur
  const interview = new Interview({
    title,
    packages: packageIds, // Burada ObjectId'leri kullanıyoruz
    questions: allQuestions, // Birleştirilmiş sorular
    expireDate,
    canSkip,
    showAtOnce,
  });

  return interview.save(); // Yeni interview'ü kaydet
};


export const getInterviews = async () => {
    try {
      // Tüm interview kayıtlarını getir
      const interviews = await Interview.find().populate('packages'); // package'ları da doldur
      return interviews;
    } catch (error) {
      // Hatanın türünü kontrol et
      if (error instanceof Error) {
        throw new Error('Error fetching interviews: ' + error.message);
      } else {
        throw new Error('Unknown error occurred while fetching interviews.');
      }
    }
  };

  export const deleteInterview = async (id: string) => {
    try {
      // Belirtilen ID'ye sahip interview'ü bul ve sil
      const result = await Interview.findByIdAndDelete(id);
      
      // Eğer interview bulunamazsa hata fırlat
      if (!result) {
        throw new Error('Interview not found');
      }
  
      return result; // Silinen interview bilgilerini döndür
    } catch (error) {
      // Hatanın türünü kontrol et
      if (error instanceof Error) {
        throw new Error('Error deleting interview: ' + error.message);
      } else {
        throw new Error('Unknown error occurred while deleting interview.');
      }
    }
  };