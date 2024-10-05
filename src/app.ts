// src/app.ts

import express, { Application, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors'; // Import CORS
import interviewRoutes from './routes/interview.routes';
import questionRoutes from './routes/questionRoutes';
import authRoutes from './routes/auth.routes'; // Import Auth Routes

// Utils imports
import { ErrorHandler } from './utils/error.handler';

dotenv.config();

const app: Application = express();
app.use(cors({
  origin: `${process.env.FRONTEND_URL}`,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Database Connection
mongoose
  .connect(process.env.MONGO_URL!)
  .then(() => console.log('Database connected successfully'))
  .catch((err) => console.error('Database connection failed:', err));

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use('/api/question-packages', questionRoutes);
app.use('/api/interviews', interviewRoutes);
app.use('/api/auth', authRoutes); // Use Auth Routes

// Error handling
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ErrorHandler) {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  } else {
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
});

// Export the app for use in other files
export default app;
