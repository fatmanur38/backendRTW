// src/scripts/createMasterAdmin.ts

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/user.model';
import bcrypt from 'bcrypt';

dotenv.config();

const createMasterAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL!);
    console.log('Database connected');

    const existingMaster = await User.findOne({ role: 'master_admin' });
    if (existingMaster) {
      console.log('Master admin already exists');
      process.exit(0);
    }

    const password = 'YourStrongPassword123'; // Güçlü bir şifre belirleyin
    const hashedPassword = await bcrypt.hash(password, 10);

    const masterAdmin = new User({
      firstName: 'Master',
      lastName: 'Admin',
      email: 'masteradmin@example.com', // Değiştirin
      phoneNumber: '1234567890', // Değiştirin
      password: hashedPassword,
      role: 'master_admin',
      status: 'approved', // Master admin zaten onaylı
    });

    await masterAdmin.save();
    console.log('Master admin created successfully');
    console.log(`Email: ${masterAdmin.email}`);
    console.log(`Password: ${password}`);
    process.exit(0);
  } catch (error) {
    console.error('Error creating master admin:', error);
    process.exit(1);
  }
};

createMasterAdmin();
