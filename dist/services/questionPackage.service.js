"use strict";
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
const question_package_model_1 = require("../models/question-package.model");
// Soru paketi oluşturma servisi
const createQuestionPackage = (title, questions) => __awaiter(void 0, void 0, void 0, function* () {
    // Önce aynı title ile bir soru paketi var mı kontrol et
    const existingPackage = yield question_package_model_1.QuestionPackageModel.findOne({ title });
    if (existingPackage) {
        throw new Error('A question package with this title already exists.');
    }
    const questionCount = questions.length;
    // Yeni bir soru paketi oluştur
    const newQuestionPackage = new question_package_model_1.QuestionPackageModel({
        title,
        questionCount,
        questions,
    });
    // Veritabanına kaydet
    return yield newQuestionPackage.save();
});
exports.createQuestionPackage = createQuestionPackage;
// Tüm soru paketlerini getirme servisi
const getQuestionPackages = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield question_package_model_1.QuestionPackageModel.find();
});
exports.getQuestionPackages = getQuestionPackages;
// ID'ye göre soru paketi getirme servisi
const getQuestionPackageById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield question_package_model_1.QuestionPackageModel.findById(id);
});
exports.getQuestionPackageById = getQuestionPackageById;
// Soru paketi silme servisi
const deleteQuestionPackage = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield question_package_model_1.QuestionPackageModel.findByIdAndDelete(id);
});
exports.deleteQuestionPackage = deleteQuestionPackage;
// Soru paketi güncelleme servisi
const updateQuestionPackage = (id, title, questions) => __awaiter(void 0, void 0, void 0, function* () {
    const questionCount = questions.length;
    return yield question_package_model_1.QuestionPackageModel.findByIdAndUpdate(id, { title, questionCount, questions }, { new: true });
});
exports.updateQuestionPackage = updateQuestionPackage;
