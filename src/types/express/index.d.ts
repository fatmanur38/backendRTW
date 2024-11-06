import 'express';
import { File as MulterFile } from 'multer';

export declare global {
  namespace Express {
    interface Request {
      file?: MulterFile; // Optional 'file' property for multer compatibility
    }
  }
}
