import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;

// Function to generate a JWT token
export const generateJWT = (payload: object): string => {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
};

// Function to verify a JWT token
export const verifyJWT = (token: string): object => {
    return jwt.verify(token, JWT_SECRET);
};