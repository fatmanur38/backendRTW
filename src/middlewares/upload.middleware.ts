// src/middlewares/upload.middleware.ts
import multer from 'multer';
import path from 'path';
import { Request } from 'express';

const storage = multer.diskStorage({
    filename: (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    },
});

// Middleware olarak `multer` yapılandırmasını dışa aktarın
export const uploadMiddleware = multer({ storage });
