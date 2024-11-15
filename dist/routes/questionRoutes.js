"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const question_package_controller_1 = require("../controllers/question-package.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = express_1.default.Router();
// Soru paketi oluşturma route'u
router.post('/', auth_middleware_1.authMiddleware, question_package_controller_1.createQuestionPackage);
router.get('/', auth_middleware_1.authMiddleware, question_package_controller_1.getQuestionPackages);
// ID'ye göre soru paketi getirme route'u
router.get('/:id', auth_middleware_1.authMiddleware, question_package_controller_1.getQuestionPackageById); // Yeni route
router.delete('/:id', auth_middleware_1.authMiddleware, question_package_controller_1.deleteQuestionPackage);
// Soru paketi güncelleme
router.put('/:id', auth_middleware_1.authMiddleware, question_package_controller_1.updateQuestionPackage);
exports.default = router;
