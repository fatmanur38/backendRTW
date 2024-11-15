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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInterviewByLink = exports.getInterviewById = exports.updateInterview = exports.deleteInterview = exports.getAllInterviews = exports.addUsersToInterview = exports.createInterview = void 0;
// services/interviewService.ts
const interviews_model_1 = __importDefault(require("../models/interviews.model"));
const mongoose_1 = __importDefault(require("mongoose"));
const question_package_model_1 = require("../models/question-package.model"); // Paket modelini import ediyoruz
const uuid_1 = require("uuid");
// Interview oluşturma servisi
const createInterview = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Aynı başlıkta bir interview var mı kontrol et
        const existingInterview = yield interviews_model_1.default.findOne({ title: data.title });
        if (existingInterview) {
            throw new Error('Interview title must be unique. A title with this name already exists.');
        }
        // Paketleri al
        const questionPackages = yield question_package_model_1.QuestionPackageModel.find({ title: { $in: data.packages } });
        const packageQuestions = questionPackages.flatMap(pkg => pkg.questions);
        const allQuestions = [...packageQuestions, ...data.questions];
        // Yeni interview oluştur
        const interview = new interviews_model_1.default({
            title: data.title,
            packages: questionPackages.map(pkg => pkg._id),
            questions: allQuestions,
            expireDate: data.expireDate,
            canSkip: data.canSkip,
            showAtOnce: data.showAtOnce,
            interviewLink: (0, uuid_1.v4)(),
        });
        // Interview'i kaydet
        const savedInterview = yield interview.save();
        return savedInterview;
    }
    catch (error) {
        // Duplicate key hatası kontrolü (MongoDB error code 11000)
        if (error.code === 11000 && error.keyValue.title) {
            throw new Error('Interview title must be unique. A title with this name already exists.');
        }
        throw new Error('Interview title must be unique. A title with this name already exists.');
    }
});
exports.createInterview = createInterview;
// Interview'e kullanıcı ekleme servisi
const addUsersToInterview = (interviewId, userIds) => __awaiter(void 0, void 0, void 0, function* () {
    if (!mongoose_1.default.isValidObjectId(interviewId)) {
        throw new Error('Geçersiz interview ID\'si.');
    }
    try {
        const updatedInterview = yield interviews_model_1.default.findByIdAndUpdate(interviewId, { $addToSet: { users: { $each: userIds } } }, // Aynı kullanıcıyı birden fazla eklemez
        { new: true }).exec();
        return updatedInterview;
    }
    catch (error) {
        throw error;
    }
});
exports.addUsersToInterview = addUsersToInterview;
const getAllInterviews = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Interview'leri veritabanından alıyoruz ve "packages" ve "users" alanlarını populate ediyoruz.
        const interviews = yield interviews_model_1.default.find().populate('packages').populate('users');
        return interviews;
    }
    catch (error) {
        throw new Error('Interview kayıtları alınırken bir hata oluştu.');
    }
});
exports.getAllInterviews = getAllInterviews;
// Interview'i ID'ye göre silen servis
const deleteInterview = (interviewId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedInterview = yield interviews_model_1.default.findByIdAndDelete(interviewId);
        if (!deletedInterview) {
            throw new Error('Interview bulunamadı.');
        }
        return deletedInterview;
    }
    catch (error) {
        throw new Error('Interview silinirken bir hata oluştu.');
    }
});
exports.deleteInterview = deleteInterview;
// Interview'i güncelleyen servis
const updateInterview = (interviewId, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedInterview = yield interviews_model_1.default.findByIdAndUpdate(interviewId, data, { new: true });
        if (!updatedInterview) {
            throw new Error('Interview bulunamadı.');
        }
        return updatedInterview;
    }
    catch (error) {
        throw new Error('Interview güncellenirken bir hata oluştu.');
    }
});
exports.updateInterview = updateInterview;
// Interview'i ID'ye göre getiren servis
const getInterviewById = (interviewId) => __awaiter(void 0, void 0, void 0, function* () {
    if (!mongoose_1.default.isValidObjectId(interviewId)) {
        throw new Error('Geçersiz interview ID\'si.');
    }
    try {
        const interview = yield interviews_model_1.default.findById(interviewId).populate('packages').populate('users');
        if (!interview) {
            throw new Error('Interview bulunamadı.');
        }
        return interview;
    }
    catch (error) {
        throw new Error('Interview getirilirken bir hata oluştu.');
    }
});
exports.getInterviewById = getInterviewById;
// Interview'i video linkine göre getiren servis
const getInterviewByLink = (link) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const interview = yield interviews_model_1.default.findOne({ interviewLink: link }).populate('packages').populate('users');
        if (!interview) {
            throw new Error('Interview bulunamadı.');
        }
        return interview;
    }
    catch (error) {
        throw new Error('Interview getirilirken bir hata oluştu.');
    }
});
exports.getInterviewByLink = getInterviewByLink;
