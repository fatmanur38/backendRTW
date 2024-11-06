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
exports.deleteVideoById = exports.getVideoById = exports.getAllVideos = exports.uploadToS3 = void 0;
// src/services/s3.service.ts
const axios_1 = __importDefault(require("axios"));
const form_data_1 = __importDefault(require("form-data"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
// Ortam değişkenlerini alalım
const S3_UPLOAD_URL = process.env.S3_UPLOAD_URL;
const PROJECT_NAME = process.env.PROJECT_NAME;
const BUCKET_NAME = process.env.BUCKET_NAME;
const ACCESS_KEY = process.env.ACCESS_KEY;
const uploadToS3 = (filePath) => __awaiter(void 0, void 0, void 0, function* () {
    const formData = new form_data_1.default();
    formData.append('project', PROJECT_NAME);
    formData.append('bucket', BUCKET_NAME);
    formData.append('accessKey', ACCESS_KEY);
    formData.append('file', fs_1.default.createReadStream(path_1.default.resolve(filePath)));
    const response = yield axios_1.default.post(S3_UPLOAD_URL, formData, {
        headers: Object.assign({}, formData.getHeaders()),
    });
    return response.data;
});
exports.uploadToS3 = uploadToS3;
const getAllVideos = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios_1.default.get(`${S3_UPLOAD_URL}/${PROJECT_NAME}/${BUCKET_NAME}/${ACCESS_KEY}`);
    return response.data;
});
exports.getAllVideos = getAllVideos;
const getVideoById = (videoId) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios_1.default.get(`${S3_UPLOAD_URL}/${PROJECT_NAME}/${BUCKET_NAME}/${ACCESS_KEY}/${videoId}`);
    return response.data;
});
exports.getVideoById = getVideoById;
const deleteVideoById = (videoId) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios_1.default.delete(`${S3_UPLOAD_URL}/${PROJECT_NAME}/${BUCKET_NAME}/${ACCESS_KEY}/${videoId}`);
    return response.data;
});
exports.deleteVideoById = deleteVideoById;
