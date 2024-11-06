"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/s3.routes.ts
const express_1 = __importDefault(require("express"));
const s3_controller_1 = require("../controllers/s3.controller");
const upload_middleware_1 = require("../middlewares/upload.middleware");
const s3_controller_2 = require("../controllers/s3.controller");
//
const router = express_1.default.Router();
router.post('/upload', upload_middleware_1.uploadMiddleware.single('file'), s3_controller_1.uploadFile);
router.get('/videos', s3_controller_2.getAllVideosController);
router.get('/videos/:id', s3_controller_2.getVideoByIdController);
router.delete('/videos/:id', s3_controller_2.deleteVideoByIdController);
exports.default = router;
