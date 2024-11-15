// src/routes/s3.routes.ts
import express from 'express';
import { uploadFile } from '../controllers/s3.controller';
import { uploadMiddleware } from '../middlewares/upload.middleware';
import { getAllVideosController , getVideoByIdController , deleteVideoByIdController} from '../controllers/s3.controller';
//
const router = express.Router();

router.post('/upload', uploadMiddleware.single('file'), uploadFile);

router.get('/videos', getAllVideosController);

router.get('/videos/:id', getVideoByIdController);

router.delete('/videos/:id', deleteVideoByIdController);


export default router;