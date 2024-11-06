import { Request } from 'express';
import multer, { StorageEngine } from 'multer';
import path from 'path';

const storage: StorageEngine = multer.diskStorage({
  filename: (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  },
});

export const uploadMiddleware = multer({ storage });
