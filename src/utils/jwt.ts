import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Request, Response } from 'express';

// Load environment variables
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;
console.log("JWT_SECRET", JWT_SECRET);

export const generateJWT = (payload: object): string => {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '24h' });
};


export const verifyJWT = (token: string): JwtPayload | string => {
    const decoded = jwt.verify(token, JWT_SECRET);

    // TypeScript's type guard to ensure we return the correct type
    if (typeof decoded === 'string') {
        throw new Error('Invalid token payload: expected an object');
    }

    return decoded as JwtPayload;
};


export const generateLink = (req: Request, res: Response): Response | void => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ error: 'Email is required' });
    }

    const token = generateJWT({ email });
    const interviewLink = `http://localhost:3000/interview?token=${token}`;

    return res.json({ link: interviewLink });
};

export const verifyLink = (req: Request, res: Response): Response | void => {
    const token = req.query.token as string;

    if (!token) {
        return res.status(400).json({ error: 'Token is required' });
    }

    try {
        const decoded = verifyJWT(token);
        return res.status(200).send(`Welcome to the interview, ${(decoded as any).email}`);
    } catch (err) {
        return res.status(401).send('Unauthorized or expired link');
    }
};