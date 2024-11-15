"use strict";
// src/server.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const PORT = process.env.PORT || 4000; // PORT'u ayarlıyoruz
const BACKEND_URL = process.env.BACKEND_URL || `http://localhost:${PORT}`;
app_1.default.listen(PORT, () => {
    console.log(`Server is running on ${BACKEND_URL}`);
}).on('error', (err) => {
    console.error('Failed to start server:', err);
});
