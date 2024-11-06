// src/middlewares/upload.middleware.ts
import multer, { StorageEngine } from 'multer';
import path from 'path';
import { Request } from 'express';

// Dosyaları diske kaydetmek için bir `diskStorage` yapılandırması tanımlayın
const storage: StorageEngine = multer.diskStorage({
    filename: (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    },
});

// Middleware olarak `multer` yapılandırmasını dışa aktarın
export const uploadMiddleware = multer({ storage });
