"use strict";
// src/controllers/userController.ts
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
const user_service_1 = __importDefault(require("../services/user.service"));
class UserController {
    // Yeni kullanıcı oluşturma
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, surname, email, phone, videoUrl, status, note } = req.body;
                // Gerekli alanların kontrolü (isteğe bağlı, model tarafından zaten doğrulanıyor)
                if (!name || !surname || !email || !phone) {
                    res.status(400).json({ message: 'Name, surname, email ve phone zorunludur.' });
                    return;
                }
                const newUser = yield user_service_1.default.createUser({
                    name,
                    surname,
                    email,
                    phone,
                    videoUrl,
                    status,
                    note,
                });
                res.status(201).json(newUser);
            }
            catch (error) {
                // Mongoose hatalarını yakalama
                if (error.name === 'ValidationError') {
                    res.status(400).json({ message: error.message });
                }
                else if (error.code === 11000) { // Duplicate key error (örneğin, unique email)
                    res.status(400).json({ message: 'Bu email zaten kullanımda.' });
                }
                else {
                    res.status(500).json({ message: 'Sunucu hatası', error: error.message });
                }
            }
        });
    }
    // Kullanıcıyı ID'ye göre alma
    getUserById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const user = yield user_service_1.default.getUserById(id);
                if (!user) {
                    res.status(404).json({ message: 'Kullanıcı bulunamadı.' });
                    return;
                }
                res.status(200).json(user);
            }
            catch (error) {
                if (error.message === 'Geçersiz kullanıcı ID\'si.') {
                    res.status(400).json({ message: error.message });
                }
                else {
                    res.status(500).json({ message: 'Sunucu hatası', error: error.message });
                }
            }
        });
    }
    // Tüm kullanıcıları çekme
    getAllUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield user_service_1.default.getAllUsers();
                res.status(200).json(users);
            }
            catch (error) {
                res.status(500).json({ message: 'Sunucu hatası', error: error.message });
            }
        });
    }
    // Kullanıcıyı güncelleme
    updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const updateData = req.body;
                // Boş güncelleme kontrolü
                if (Object.keys(updateData).length === 0) {
                    res.status(400).json({ message: 'Güncellenecek veri sağlanmadı.' });
                    return;
                }
                const updatedUser = yield user_service_1.default.updateUser(id, updateData);
                if (!updatedUser) {
                    res.status(404).json({ message: 'Kullanıcı bulunamadı.' });
                    return;
                }
                res.status(200).json(updatedUser);
            }
            catch (error) {
                if (error.message === 'Geçersiz kullanıcı ID\'si.') {
                    res.status(400).json({ message: error.message });
                }
                else if (error.name === 'ValidationError') {
                    res.status(400).json({ message: error.message });
                }
                else if (error.code === 11000) { // Duplicate key error (örneğin, unique email)
                    res.status(400).json({ message: 'Bu email zaten kullanımda.' });
                }
                else {
                    res.status(500).json({ message: 'Sunucu hatası', error: error.message });
                }
            }
        });
    }
    // Kullanıcı video URL'sini güncelleme
    updateUserVideoUrl(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { videoUrl } = req.body;
                if (!videoUrl) {
                    res.status(400).json({ message: 'videoUrl sağlanmalıdır.' });
                    return;
                }
                const updatedUser = yield user_service_1.default.updateUserVideoUrl(id, videoUrl);
                if (!updatedUser) {
                    res.status(404).json({ message: 'Kullanıcı bulunamadı.' });
                    return;
                }
                res.status(200).json(updatedUser);
            }
            catch (error) {
                if (error.message === 'Geçersiz kullanıcı ID\'si.') {
                    res.status(400).json({ message: error.message });
                }
                else if (error.name === 'ValidationError') {
                    res.status(400).json({ message: error.message });
                }
                else {
                    res.status(500).json({ message: 'Sunucu hatası', error: error.message });
                }
            }
        });
    }
}
exports.default = new UserController();
