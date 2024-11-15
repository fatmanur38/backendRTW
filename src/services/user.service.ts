// src/services/userService.ts

import User, { IUser } from '../models/user.model';
import mongoose, { UpdateQuery } from 'mongoose';

interface CreateUserInput {
  name: string;
  surname: string;
  email: string;
  phone: string;
  videoUrl?: string;
  status?: 'active' | 'inactive';
  note?: string;
}

class UserService {
  // Kullanıcı oluşturma
  public async createUser(input: CreateUserInput): Promise<IUser> {
    try {
      const user = new User(input);
      const savedUser = await user.save();
      return savedUser;
    } catch (error) {
      throw error;
    }
  }

  // Kullanıcıyı ID'ye göre alma
  public async getUserById(id: string): Promise<IUser | null> {
    if (!mongoose.isValidObjectId(id)) {
      throw new Error('Geçersiz kullanıcı ID\'si.');
    }

    const user = await User.findById(id).exec();
    return user;
  }

  // Tüm kullanıcıları çekme
  public async getAllUsers(): Promise<IUser[]> {
    try {
      const users = await User.find().exec();
      return users;
    } catch (error) {
      throw error;
    }
  }

  // Kullanıcıyı güncelleme
  public async updateUser(id: string, updateData: UpdateQuery<IUser>): Promise<IUser | null> {
    if (!mongoose.isValidObjectId(id)) {
      throw new Error('Geçersiz kullanıcı ID\'si.');
    }

    try {
      const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true, runValidators: true }).exec();
      return updatedUser;
    } catch (error) {
      throw error;
    }
  }

  // Kullanıcı video URL'sini güncelleme
  public async updateUserVideoUrl(id: string, videoUrl: string): Promise<IUser | null> {
    if (!mongoose.isValidObjectId(id)) {
      throw new Error('Geçersiz kullanıcı ID\'si.');
    }

    try {
      const updatedUser = await User.findByIdAndUpdate(
        id,
        { videoUrl },
        { new: true, runValidators: true }
      ).exec();
      return updatedUser;
    } catch (error) {
      throw error;
    }
  }

  // Diğer servis metodlarını buraya ekleyebilirsiniz (örneğin, deleteUser)
}

export default new UserService();
