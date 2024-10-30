// src/controllers/userController.ts

import { Request, Response } from 'express';
import userService from '../services/user.service';
import { UpdateQuery } from 'mongoose';
import { IUser } from '../models/user.model';

class UserController {
  // Yeni kullanıcı oluşturma
  public async createUser(req: Request, res: Response): Promise<void> {
    try {
      const { name, surname, email, phone, videoUrl, status, note } = req.body;

      // Gerekli alanların kontrolü (isteğe bağlı, model tarafından zaten doğrulanıyor)
      if (!name || !surname || !email || !phone) {
        res.status(400).json({ message: 'Name, surname, email ve phone zorunludur.' });
        return;
      }

      const newUser = await userService.createUser({
        name,
        surname,
        email,
        phone,
        videoUrl,
        status,
        note,
      });

      res.status(201).json(newUser);
    } catch (error: any) {
      // Mongoose hatalarını yakalama
      if (error.name === 'ValidationError') {
        res.status(400).json({ message: error.message });
      } else if (error.code === 11000) { // Duplicate key error (örneğin, unique email)
        res.status(400).json({ message: 'Bu email zaten kullanımda.' });
      } else {
        res.status(500).json({ message: 'Sunucu hatası', error: error.message });
      }
    }
  }

  // Kullanıcıyı ID'ye göre alma
  public async getUserById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const user = await userService.getUserById(id);

      if (!user) {
        res.status(404).json({ message: 'Kullanıcı bulunamadı.' });
        return;
      }

      res.status(200).json(user);
    } catch (error: any) {
      if (error.message === 'Geçersiz kullanıcı ID\'si.') {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Sunucu hatası', error: error.message });
      }
    }
  }

  // Tüm kullanıcıları çekme
  public async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await userService.getAllUsers();
      res.status(200).json(users);
    } catch (error: any) {
      res.status(500).json({ message: 'Sunucu hatası', error: error.message });
    }
  }

  // Kullanıcıyı güncelleme
  public async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const updateData: UpdateQuery<IUser> = req.body;

      // Boş güncelleme kontrolü
      if (Object.keys(updateData).length === 0) {
        res.status(400).json({ message: 'Güncellenecek veri sağlanmadı.' });
        return;
      }

      const updatedUser = await userService.updateUser(id, updateData);

      if (!updatedUser) {
        res.status(404).json({ message: 'Kullanıcı bulunamadı.' });
        return;
      }

      res.status(200).json(updatedUser);
    } catch (error: any) {
      if (error.message === 'Geçersiz kullanıcı ID\'si.') {
        res.status(400).json({ message: error.message });
      } else if (error.name === 'ValidationError') {
        res.status(400).json({ message: error.message });
      } else if (error.code === 11000) { // Duplicate key error (örneğin, unique email)
        res.status(400).json({ message: 'Bu email zaten kullanımda.' });
      } else {
        res.status(500).json({ message: 'Sunucu hatası', error: error.message });
      }
    }
  }

  // Kullanıcı video URL'sini güncelleme
  public async updateUserVideoUrl(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { videoUrl } = req.body;

      if (!videoUrl) {
        res.status(400).json({ message: 'videoUrl sağlanmalıdır.' });
        return;
      }

      const updatedUser = await userService.updateUserVideoUrl(id, videoUrl);

      if (!updatedUser) {
        res.status(404).json({ message: 'Kullanıcı bulunamadı.' });
        return;
      }

      res.status(200).json(updatedUser);
    } catch (error: any) {
      if (error.message === 'Geçersiz kullanıcı ID\'si.') {
        res.status(400).json({ message: error.message });
      } else if (error.name === 'ValidationError') {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Sunucu hatası', error: error.message });
      }
    }
  }

  // Diğer kontrolcü metodlarını buraya ekleyebilirsiniz (örneğin, deleteUser)
}

export default new UserController();
