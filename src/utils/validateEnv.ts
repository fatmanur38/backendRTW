import dotenv from 'dotenv';

dotenv.config();

const validateEnv = () => {
  if (!process.env.MASTER_ADMIN_EMAIL || !process.env.MASTER_ADMIN_PASSWORD || !process.env.JWT_SECRET) {
    throw new Error('Required environment variables are missing');
  }
};

export default validateEnv;
