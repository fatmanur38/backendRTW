// src/services/auth.service.ts
import * as dotenv from 'dotenv';

dotenv.config();

export class AuthService {
  private masterAdminEmail: string;
  private masterAdminPassword: string;

  constructor() {
    this.masterAdminEmail = process.env.MASTER_ADMIN_EMAIL || '';
    this.masterAdminPassword = process.env.MASTER_ADMIN_PASSWORD || '';
  }

  public verifyCredentials(email: string, password: string): boolean {
    return email === this.masterAdminEmail && password === this.masterAdminPassword;
  }
}
