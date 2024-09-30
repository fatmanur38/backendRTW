import { Request, Response } from 'express';
import { generateJWT, verifyJWT } from '../utils/jwt';

// Controller to generate the interview link
export const generateLink = (req: Request, res: Response): Response | void => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  // Generate a JWT token
  const token = generateJWT({ email });
  const interviewLink = `http://localhost:3000/interview?token=${token}`;

  return res.json({ link: interviewLink });
};

// Controller to verify the token and display the interview page
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