"use strict";
// src/app.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors")); // Import CORS
const interview_routes_1 = __importDefault(require("./routes/interview.routes"));
const questionRoutes_1 = __importDefault(require("./routes/questionRoutes"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes")); // Import Auth Routes
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const s3_routes_1 = __importDefault(require("./routes/s3.routes"));
// Utils imports
const error_handler_1 = require("./utils/error.handler");
//
dotenv_1.default.config();
const app = (0, express_1.default)();
//const allowedOrigins = [`${process.env.FRONTEND_URL}`, `${process.env.USER_FRONTEND_URL}`]; // İki frontend portu
// app.use(cors({
//   // origin: (origin, callback) => {
//   //   if (!origin || allowedOrigins.includes(origin)) {
//   //     callback(null, true);
//   //   } else {
//   //     callback(new Error('Not allowed by CORS'));
//   //   }
//   // },
//   // credentials: true,
//   // methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   // allowedHeaders: ['Content-Type', 'Authorization'],
//   origin: [process.env.FRONTEND_URL || 'http://localhost:5173' , 'http://localhost:5173'],
//   methods: 'GET,POST,PUT,DELETE',
//   allowedHeaders: 'Content-Type, Authorization',
//   credentials: true, // Bu seçenek, çerezleri etkinleştirir
// }));
app.use((0, cors_1.default)({
    origin: [process.env.FRONTEND_URL || "http://localhost:5173", process.env.USER_FRONTEND_URL || "http://localhost:5174"],
    methods: ["GET", "POST", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // Credentials ile ilgili isteklere izin ver
}));
// Enable CORS
// Database Connection
mongoose_1.default
    .connect(process.env.MONGO_URL)
    .then(() => console.log('Database connected successfully'))
    .catch((err) => console.error('Database connection failed:', err));
// Middlewares
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
// Routes
app.use('/api/question-packages', questionRoutes_1.default);
app.use('/api/', interview_routes_1.default);
app.use('/api/auth', auth_routes_1.default);
app.use('/api', user_routes_1.default);
app.use('/api/s3', s3_routes_1.default);
// Error handling
app.use((err, req, res, next) => {
    if (err instanceof error_handler_1.ErrorHandler) {
        res.status(err.statusCode).json({
            success: false,
            message: err.message,
        });
    }
    else {
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
        });
    }
});
// Export the app for use in other files
exports.default = app;
