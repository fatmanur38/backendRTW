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
import userRoutes from './routes/user.routes';
import s3Routes from './routes/s3.routes';

// Utils imports
import { ErrorHandler } from './utils/error.handler';
//
dotenv.config();

const app: Application = express();

const allowedOrigins = [`${process.env.FRONTEND_URL}`, `${process.env.USER_FRONTEND_URL}`]; // İki frontend portu

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
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
app.use('/api/', interviewRoutes);
app.use('/api/auth', authRoutes);
app.use('/api', userRoutes);
app.use('/api/s3', s3Routes);

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
