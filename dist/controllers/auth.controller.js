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
exports.AuthController = void 0;
const auth_service_1 = require("../services/auth.service");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class AuthController {
    constructor() {
        // Login işlemi
        this.login = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            const isLoginSuccessful = yield this.authService.verifyCredentials(email, password);
            if (isLoginSuccessful) {
                // JWT oluşturma
                const token = jsonwebtoken_1.default.sign({ email }, process.env.SECRET_KEY, {
                    expiresIn: '1h',
                });
                // Token'ı cookie'ye `HttpOnly` olarak ekleme
                res.cookie('jwt', token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production', // Only secure in production (HTTPS)
                    maxAge: 1000 * 60 * 60 * 8, // 8 hours
                    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax', // SameSite=None for cross-origin in production
                });
                res.status(200).json({ message: 'Login successful!', token });
            }
            else {
                res.status(401).json({ message: 'Invalid email or password' });
            }
        });
        // Logout işlemi
        this.logout = (req, res) => {
            res.clearCookie('authToken'); // Cookie'yi temizle
            res.status(200).json({ message: 'Logout successful!' });
        };
        this.authService = new auth_service_1.AuthService();
    }
}
exports.AuthController = AuthController;
