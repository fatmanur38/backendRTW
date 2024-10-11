import mongoose, { Schema, Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

// Interview Interface'ini tanımlıyoruz
export interface IInterview extends Document {
  title: string;
  packages: mongoose.Schema.Types.ObjectId[];
  questions: { question: string; time: number }[];
  expireDate: Date;
  canSkip: boolean;
  showAtOnce: boolean;
  interviewLink: string;
  users?: mongoose.Schema.Types.ObjectId[]; // Birden fazla kullanıcı için dizi
}

// Interview schema tanımı
const InterviewSchema: Schema<IInterview> = new Schema({
  title: {
    type: String,
    required: true,
  },
  packages: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'QuestionPackage',
    },
  ],
  questions: [
    {
      question: String,
      time: Number,
    },
  ],
  expireDate: {
    type: Date,
    required: true,
  },
  canSkip: {
    type: Boolean,
    default: false,
  },
  showAtOnce: {
    type: Boolean,
    default: false,
  },
  interviewLink: {
    type: String,
    default: uuidv4,
    unique: true,
  },
  users: [{ // Kullanıcı dizisi
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: [], // Başlangıçta boş dizi
  }],
});

const Interview = mongoose.model<IInterview>('Interview', InterviewSchema);
export default Interview;
