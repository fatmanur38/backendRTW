// src/services/auth.service.ts

import User, { IUser } from '../models/user.model';
import generateToken from '../utils/generateToken';
import { ErrorHandler } from '../utils/error.handler';

class AuthService {
  // Kullanıcı kaydı
  public async register(userData: Partial<IUser>): Promise<IUser> {
    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
      throw new ErrorHandler(400, 'Email already in use');
    }

    const user = new User({
      ...userData,
      role: 'admin', // Rolü 'admin' olarak ayarla
      status: 'pending', // Durumu 'pending' olarak ayarla
    });
    await user.save();
    return user;
  }

  // Kullanıcı girişi
  public async login(email: string, password: string): Promise<{ user: IUser; token: string }> {
    const user = await User.findOne({ email });
    if (!user) {
      throw new ErrorHandler(401, 'Invalid email or password');
    }

    if (user.status !== 'approved') {
      throw new ErrorHandler(403, 'User is not approved yet');
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      throw new ErrorHandler(401, 'Invalid email or password');
    }

    const token = generateToken(user);
    return { user, token };
  }

  // Kullanıcı onayı (master_admin tarafından)
  public async approveUser(userId: string): Promise<IUser> {
    const user = await User.findById(userId);
    if (!user) {
      throw new ErrorHandler(404, 'User not found');
    }

    user.status = 'approved';
    await user.save();
    return user;
  }
}

export default new AuthService();
