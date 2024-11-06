// src/types/express/index.d.ts
import { Request } from 'express';
import { File } from 'multer';

export interface CustomRequest extends Request {
  file?: File;
}
