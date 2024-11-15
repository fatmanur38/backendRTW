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
exports.getInterviewByLinkController = exports.getInterviewByIdController = exports.updateInterviewController = exports.deleteInterviewController = exports.getAllInterviewsController = exports.addUsersToInterviewController = exports.createInterviewController = void 0;
const interview_service_1 = require("../services/interview.service");
// Interview oluşturma controller'ı (Mevcut kod)
const createInterviewController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, packages, questions, expireDate, canSkip, showAtOnce } = req.body;
        const interview = yield (0, interview_service_1.createInterview)({
            title,
            packages,
            questions,
            expireDate,
            canSkip,
            showAtOnce,
        });
        res.status(201).json({
            message: 'Interview successfully created.',
            interview,
        });
    }
    catch (error) {
        if (error.message.includes('Interview title must be unique')) {
            res.status(400).json({
                message: error.message, // Specific message for duplicate title
            });
        }
        else {
            res.status(500).json({
                message: 'An error occurred while creating the interview.',
                error: error.message,
            });
        }
    }
});
exports.createInterviewController = createInterviewController;
// Interview'e kullanıcı ekleme controller'ı
const addUsersToInterviewController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { interviewId } = req.params;
        const { userIds } = req.body; // Kullanıcı ID'lerinin dizisi
        if (!Array.isArray(userIds) || userIds.length === 0) {
            res.status(400).json({ message: 'Kullanıcı ID\'leri geçersiz.' });
            return;
        }
        // Kullanıcıları Interview'e eklemek için servisi çağırma
        const updatedInterview = yield (0, interview_service_1.addUsersToInterview)(interviewId, userIds);
        if (!updatedInterview) {
            res.status(404).json({ message: 'Interview bulunamadı.' });
            return;
        }
        res.status(200).json({
            message: 'Kullanıcılar başarıyla eklendi.',
            updatedInterview,
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Interview\'e kullanıcı eklenirken bir hata meydana geldi.',
            error: error.message,
        });
    }
});
exports.addUsersToInterviewController = addUsersToInterviewController;
// Tüm interview'leri dönen controller
const getAllInterviewsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Servisi çağırarak tüm interview'leri alıyoruz
        const interviews = yield (0, interview_service_1.getAllInterviews)();
        res.status(200).json({
            message: 'Tüm interview kayıtları başarıyla alındı.',
            interviews,
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Interview kayıtları alınırken bir hata oluştu.',
            error: error.message,
        });
    }
});
exports.getAllInterviewsController = getAllInterviewsController;
// Interview'i ID'ye göre silen controller
const deleteInterviewController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { interviewId } = req.params;
        // Interview'i silmek için servisi çağırıyoruz
        const deletedInterview = yield (0, interview_service_1.deleteInterview)(interviewId);
        res.status(200).json({
            message: 'Interview başarıyla silindi.',
            deletedInterview,
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Interview silinirken bir hata oluştu.',
            error: error.message,
        });
    }
});
exports.deleteInterviewController = deleteInterviewController;
// Interview'i ID'ye göre güncelleyen controller
const updateInterviewController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { interviewId } = req.params;
        const data = req.body; // Güncellemek için gönderilen veri
        // Interview'i güncellemek için servisi çağırıyoruz
        const updatedInterview = yield (0, interview_service_1.updateInterview)(interviewId, data);
        res.status(200).json({
            message: 'Interview başarıyla güncellendi.',
            updatedInterview,
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Interview güncellenirken bir hata oluştu.',
            error: error.message,
        });
    }
});
exports.updateInterviewController = updateInterviewController;
// Interview'i ID'ye göre getiren controller
const getInterviewByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { interviewId } = req.params;
        // Servis fonksiyonunu çağırarak interview'i çekiyoruz
        const interview = yield (0, interview_service_1.getInterviewById)(interviewId);
        res.status(200).json({
            message: 'Interview başarıyla getirildi.',
            interview,
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Interview getirilirken bir hata oluştu.',
            error: error.message,
        });
    }
});
exports.getInterviewByIdController = getInterviewByIdController;
// Interview'i video linkine göre getiren controller
const getInterviewByLinkController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { link } = req.params;
        // Servis fonksiyonunu çağırarak interview'i link ile alıyoruz
        const interview = yield (0, interview_service_1.getInterviewByLink)(link);
        if (!interview) {
            res.status(404).json({
                message: 'Interview bulunamadı.',
            });
            return;
        }
        res.status(200).json({
            message: 'Interview başarıyla getirildi.',
            interview,
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Interview getirilirken bir hata oluştu.',
            error: error.message,
        });
    }
});
exports.getInterviewByLinkController = getInterviewByLinkController;
