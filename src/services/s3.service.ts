// src/services/s3.service.ts
import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';
import path from 'path';
//
const S3_UPLOAD_URL = process.env.S3_UPLOAD_URL;
const PROJECT_NAME = process.env.PROJECT_NAME;
const BUCKET_NAME = process.env.BUCKET_NAME;
const ACCESS_KEY = process.env.ACCESS_KEY;

export const uploadToS3 = async (filePath: string): Promise<any> => {
    const formData = new FormData();
    formData.append('project', PROJECT_NAME);
    formData.append('bucket', BUCKET_NAME);
    formData.append('accessKey', ACCESS_KEY);
    formData.append('file', fs.createReadStream(path.resolve(filePath)));

    const response = await axios.post(S3_UPLOAD_URL!, formData, {
        headers: {
            ...formData.getHeaders(),
        },
    });

    return response.data;
};


export const getAllVideos = async (): Promise<any> => {
    const response = await axios.get(`${S3_UPLOAD_URL}/${PROJECT_NAME}/${BUCKET_NAME}/${ACCESS_KEY}`);
    return response.data;
};

export const getVideoById = async (videoId: string): Promise<any> => {
    const response = await axios.get(`${S3_UPLOAD_URL}/${PROJECT_NAME}/${BUCKET_NAME}/${ACCESS_KEY}/${videoId}`);
    return response.data;
};

export const deleteVideoById = async (videoId: string): Promise<any> => {
    const response = await axios.delete(`${S3_UPLOAD_URL}/${PROJECT_NAME}/${BUCKET_NAME}/${ACCESS_KEY}/${videoId}`);
    return response.data;
};
