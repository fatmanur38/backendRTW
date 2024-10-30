// src/controllers/s3.controller.ts
import { Request, Response } from 'express';
import { uploadToS3 } from '../services/s3.service';
import { getAllVideos } from '../services/s3.service';
import { getVideoById } from '../services/s3.service';
import { deleteVideoById } from '../services/s3.service';

//
export const uploadFile = async (req: Request, res: Response): Promise<void> => {
    try {
        if (!req.file) {
            res.status(400).json({ message: 'File is required' });
            return;
        }

        const filePath = req.file.path;
        const uploadResponse = await uploadToS3(filePath);

        res.status(200).json({
            message: 'File uploaded successfully',
            data: uploadResponse,
        });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        console.error('Error uploading file:', errorMessage);
        res.status(500).json({
            message: 'Error uploading file',
            error: errorMessage,
        });
    }
};


export const getAllVideosController = async (req: Request, res: Response): Promise<void> => {
    try {
        const videos = await getAllVideos();
        res.status(200).json({
            message: 'Videos retrieved successfully',
            data: videos,
        });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        console.error('Error retrieving videos:', errorMessage);
        res.status(500).json({
            message: 'Error retrieving videos',
            error: errorMessage,
        });
    }
};

export const getVideoByIdController = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(400).json({ message: 'Video ID is required' });
            return;
        }

        const video = await getVideoById(id);
        res.status(200).json({
            message: 'Video retrieved successfully',
            data: video,
        });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        console.error('Error retrieving video:', errorMessage);
        res.status(500).json({
            message: 'Error retrieving video',
            error: errorMessage,
        });
    }
};


export const deleteVideoByIdController = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(400).json({ message: 'Video ID is required' });
            return;
        }

        const deleteResponse = await deleteVideoById(id);
        res.status(200).json({
            message: 'Video deleted successfully',
            data: deleteResponse,
        });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        console.error('Error deleting video:', errorMessage);
        res.status(500).json({
            message: 'Error deleting video',
            error: errorMessage,
        });
    }
};