import express, { Application, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors'; // Import CORS

// Utils imports
import { ErrorHandler } from './utils/ErrorHandler';

dotenv.config();

const app: Application = express();
app.use(cors({ origin: `${process.env.FRONTEND_URL}`, credentials: true })); // Enable CORS

// Database Connection
mongoose
  .connect(process.env.MONGO_URL!)
  .then(() => console.log('Database connected successfully'))
  .catch((err) => console.error('Database connection failed:', err));

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());


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

// Server listening
const PORT = process.env.PORT || 4000; // PORT'u ayarlıyoruz
const BACKEND_URL = process.env.BACKEND_URL || `http://localhost:${PORT}`;

app.listen(PORT, () => {
  console.log(`Server is running on ${BACKEND_URL}`);
}).on('error', (err) => {
  console.error('Failed to start server:', err);
});