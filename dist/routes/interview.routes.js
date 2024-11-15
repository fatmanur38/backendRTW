"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const interview_controller_1 = require("../controllers/interview.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = express_1.default.Router();
// Interview oluşturma
router.post('/interviews', auth_middleware_1.authMiddleware, interview_controller_1.createInterviewController);
// Kullanıcıları interview'e ekleme
router.put('/interviews/:interviewId/users', interview_controller_1.addUsersToInterviewController);
// Tüm interview'leri çekme
router.get('/interviews', auth_middleware_1.authMiddleware, interview_controller_1.getAllInterviewsController);
// Interview silme
router.delete('/interviews/:interviewId', auth_middleware_1.authMiddleware, interview_controller_1.deleteInterviewController);
// Interview güncelleme
router.put('/interviews/:interviewId', auth_middleware_1.authMiddleware, interview_controller_1.updateInterviewController);
// Interview'i ID'ye göre çekme
router.get('/interviews/:interviewId', auth_middleware_1.authMiddleware, interview_controller_1.getInterviewByIdController);
// Interview'i video linkine göre getiren route
router.get('/interviews/link/:link', interview_controller_1.getInterviewByLinkController);
exports.default = router;
