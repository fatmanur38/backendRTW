"use strict";
// src/routes/userRoutes.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const router = express_1.default.Router();
// Yeni kullanıcı oluşturma rotası
router.post('/users', (req, res) => user_controller_1.default.createUser(req, res));
// Kullanıcıyı ID'ye göre alma rotası
router.get('/users/:id', (req, res) => user_controller_1.default.getUserById(req, res));
// Tüm kullanıcıları çekme rotası
router.get('/users', (req, res) => user_controller_1.default.getAllUsers(req, res));
// Kullanıcıyı güncelleme rotası
router.put('/users/:id', (req, res) => user_controller_1.default.updateUser(req, res));
// Kullanıcı video URL'sini güncelleme
router.put('/users/:id/video-url', user_controller_1.default.updateUserVideoUrl);
// Diğer rotaları buraya ekleyebilirsiniz (örneğin, DELETE /users/:id)
exports.default = router;
