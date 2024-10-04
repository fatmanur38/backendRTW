import mongoose, { Schema, Document } from 'mongoose';

// Önceden verilen QuestionSchema
const QuestionSchema: Schema = new Schema({
    question: {
        type: String,
        required: true,
    },
    time: {
        type: Number,
        required: true,
    },
});

// Interview schema tanımı
const InterviewSchema: Schema = new Schema({
    title: {
        type: String,
        required: true,
    },
    packages: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'QuestionPackage', // Daha önce oluşturulmuş olan soru paketlerini referans alacağız
        },
    ],
    questions: [QuestionSchema], // Dinamik olarak paketlerden veya elle eklenen sorular tutulacak
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
});

// Interview dokümanı için Mongoose modeli
const Interview = mongoose.model<Document>('Interview', InterviewSchema);

export default Interview;
