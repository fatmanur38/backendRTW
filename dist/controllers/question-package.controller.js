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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateQuestionPackage = exports.deleteQuestionPackage = exports.getQuestionPackageById = exports.getQuestionPackages = exports.createQuestionPackage = void 0;
const QuestionPackageService = __importStar(require("../services/questionPackage.service"));
// Soru paketi oluşturma controller'ı
const createQuestionPackage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, questions } = req.body;
        if (!title || !questions) {
            res.status(400).json({ message: 'Title and questions are required.' });
            return;
        }
        // Her bir sorunun 'time' alanının integer olup olmadığını kontrol et
        for (const question of questions) {
            if (!Number.isInteger(question.time)) {
                res.status(400).json({ message: `Time for question "${question.question}" must be an integer.` });
                return;
            }
        }
        // Aynı title var mı kontrol et
        const newQuestionPackage = yield QuestionPackageService.createQuestionPackage(title, questions);
        res.status(201).json({ message: 'Question package created successfully.', data: newQuestionPackage });
    }
    catch (error) {
        if (error.message === 'A question package with this title already exists.') {
            res.status(400).json({ message: error.message });
        }
        else {
            res.status(500).json({ message: 'Error creating question package.', error });
        }
    }
});
exports.createQuestionPackage = createQuestionPackage;
// Tüm soru paketlerini getirme controller'ı
const getQuestionPackages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const questionPackages = yield QuestionPackageService.getQuestionPackages();
        res.status(200).json({ message: 'Question packages retrieved successfully.', data: questionPackages });
    }
    catch (error) {
        res.status(500).json({ message: 'Error retrieving question packages.', error });
    }
});
exports.getQuestionPackages = getQuestionPackages;
// ID'ye göre soru paketi getirme controller'ı
const getQuestionPackageById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const questionPackage = yield QuestionPackageService.getQuestionPackageById(id);
        if (!questionPackage) {
            res.status(404).json({ message: 'Question package not found.' });
            return;
        }
        res.status(200).json({ message: 'Question package retrieved successfully.', data: questionPackage });
    }
    catch (error) {
        res.status(500).json({ message: 'Error retrieving question package.', error });
    }
});
exports.getQuestionPackageById = getQuestionPackageById;
// Soru paketi silme controller'ı
const deleteQuestionPackage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deletedPackage = yield QuestionPackageService.deleteQuestionPackage(id);
        if (!deletedPackage) {
            res.status(404).json({ message: 'Question package not found.' });
            return;
        }
        res.status(200).json({ message: 'Question package deleted successfully.' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error deleting question package.', error });
    }
});
exports.deleteQuestionPackage = deleteQuestionPackage;
// Soru paketi güncelleme controller'ı
const updateQuestionPackage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { title, questions } = req.body;
        if (!title || !questions) {
            res.status(400).json({ message: 'Title and questions are required.' });
            return;
        }
        for (const question of questions) {
            if (!Number.isInteger(question.time)) {
                res.status(400).json({ message: `Time for question "${question.question}" must be an integer.` });
                return;
            }
        }
        const updatedPackage = yield QuestionPackageService.updateQuestionPackage(id, title, questions);
        if (!updatedPackage) {
            res.status(404).json({ message: 'Question package not found.' });
            return;
        }
        res.status(200).json({ message: 'Question package updated successfully.', data: updatedPackage });
    }
    catch (error) {
        res.status(500).json({ message: 'Error updating question package.', error });
    }
});
exports.updateQuestionPackage = updateQuestionPackage;
