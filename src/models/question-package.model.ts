import mongoose, { Schema, Document } from 'mongoose';

// Interface for a question
interface Question {
    question: string;
    time: number;
}

// Interface for a question package
export interface QuestionPackage extends Document {
    title: string;
    questionCount: number;
    questions: Question[];
}

// Mongoose schema for a question
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

// Mongoose schema for a question package
const QuestionPackageSchema: Schema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true, // Ensure the title is unique
    },
    questionCount: {
        type: Number,
        required: true,
        default: 0, // This can be updated based on the number of questions in the array
    },
    questions: {
        type: [QuestionSchema],
        required: true,
        default: [],
    },
});

// Mongoose model for question packages
export const QuestionPackageModel = mongoose.model<QuestionPackage>('QuestionPackage', QuestionPackageSchema);
