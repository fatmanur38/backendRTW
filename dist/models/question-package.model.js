"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionPackageModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
// Mongoose schema for a question
const QuestionSchema = new mongoose_1.Schema({
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
const QuestionPackageSchema = new mongoose_1.Schema({
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
exports.QuestionPackageModel = mongoose_1.default.model('QuestionPackage', QuestionPackageSchema);
