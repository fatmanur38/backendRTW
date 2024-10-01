import mongoose, { Schema, Document } from 'mongoose';

// TypeScript interface
export interface Question extends Document {
    question: string;
    categoryName: string;
    timeLimit: number;
}

// Mongoose schema
const QuestionSchema: Schema = new Schema({
    question: {
        type: String,
        required: true,
    },
    categoryName: {
        type: String,
        required: true,
    },
    timeLimit: {
        type: Number,
        required: true,
    },
});

// Mongoose model
export const QuestionModel = mongoose.model<Question>('Question', QuestionSchema);
