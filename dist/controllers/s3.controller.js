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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteVideoByIdController = exports.getVideoByIdController = exports.getAllVideosController = exports.uploadFile = void 0;
const s3_service_1 = require("../services/s3.service");
const s3_service_2 = require("../services/s3.service");
const s3_service_3 = require("../services/s3.service");
const s3_service_4 = require("../services/s3.service");
//
const uploadFile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.file) {
            res.status(400).json({ message: 'File is required' });
            return;
        }
        const filePath = req.file.path;
        const uploadResponse = yield (0, s3_service_1.uploadToS3)(filePath);
        res.status(200).json({
            message: 'File uploaded successfully',
            data: uploadResponse,
        });
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        console.error('Error uploading file:', errorMessage);
        res.status(500).json({
            message: 'Error uploading file',
            error: errorMessage,
        });
    }
});
exports.uploadFile = uploadFile;
const getAllVideosController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const videos = yield (0, s3_service_2.getAllVideos)();
        res.status(200).json({
            message: 'Videos retrieved successfully',
            data: videos,
        });
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        console.error('Error retrieving videos:', errorMessage);
        res.status(500).json({
            message: 'Error retrieving videos',
            error: errorMessage,
        });
    }
});
exports.getAllVideosController = getAllVideosController;
const getVideoByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(400).json({ message: 'Video ID is required' });
            return;
        }
        const video = yield (0, s3_service_3.getVideoById)(id);
        res.status(200).json({
            message: 'Video retrieved successfully',
            data: video,
        });
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        console.error('Error retrieving video:', errorMessage);
        res.status(500).json({
            message: 'Error retrieving video',
            error: errorMessage,
        });
    }
});
exports.getVideoByIdController = getVideoByIdController;
const deleteVideoByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(400).json({ message: 'Video ID is required' });
            return;
        }
        const deleteResponse = yield (0, s3_service_4.deleteVideoById)(id);
        res.status(200).json({
            message: 'Video deleted successfully',
            data: deleteResponse,
        });
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        console.error('Error deleting video:', errorMessage);
        res.status(500).json({
            message: 'Error deleting video',
            error: errorMessage,
        });
    }
});
exports.deleteVideoByIdController = deleteVideoByIdController;
