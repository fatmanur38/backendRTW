"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const validateEnv = () => {
    if (!process.env.MASTER_ADMIN_EMAIL || !process.env.MASTER_ADMIN_PASSWORD || !process.env.JWT_SECRET) {
        throw new Error('Required environment variables are missing');
    }
};
exports.default = validateEnv;
