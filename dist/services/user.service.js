"use strict";
// src/services/userService.ts
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
const user_model_1 = __importDefault(require("../models/user.model"));
const mongoose_1 = __importDefault(require("mongoose"));
class UserService {
    // Kullanıcı oluşturma
    createUser(input) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = new user_model_1.default(input);
                const savedUser = yield user.save();
                return savedUser;
            }
            catch (error) {
                throw error;
            }
        });
    }
    // Kullanıcıyı ID'ye göre alma
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
                throw new Error('Geçersiz kullanıcı ID\'si.');
            }
            const user = yield user_model_1.default.findById(id).exec();
            return user;
        });
    }
    // Tüm kullanıcıları çekme
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield user_model_1.default.find().exec();
                return users;
            }
            catch (error) {
                throw error;
            }
        });
    }
    // Kullanıcıyı güncelleme
    updateUser(id, updateData) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
                throw new Error('Geçersiz kullanıcı ID\'si.');
            }
            try {
                const updatedUser = yield user_model_1.default.findByIdAndUpdate(id, updateData, { new: true, runValidators: true }).exec();
                return updatedUser;
            }
            catch (error) {
                throw error;
            }
        });
    }
    // Kullanıcı video URL'sini güncelleme
    updateUserVideoUrl(id, videoUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
                throw new Error('Geçersiz kullanıcı ID\'si.');
            }
            try {
                const updatedUser = yield user_model_1.default.findByIdAndUpdate(id, { videoUrl }, { new: true, runValidators: true }).exec();
                return updatedUser;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = new UserService();
