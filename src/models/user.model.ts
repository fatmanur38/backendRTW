// models/User.ts

import mongoose, { Document, Schema } from 'mongoose';

// Kullanıcı arayüzünü tanımla
export interface IUser extends Document {
  name: string;
  surname: string;
  email: string;
  phone: string;
  videoUrl?: string;
  status: 'active' | 'inactive';
  note?: string;
}

// User şemasını oluştur
const UserSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    surname: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/\S+@\S+\.\S+/, 'Geçerli bir email adresi giriniz.'],
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    videoUrl: {
      type: String,
      trim: true,
      validate: {
        validator: function (v: string) {
          return /^(ftp|http|https):\/\/[^ "]+$/.test(v);
        },
        message: (props: any) => `${props.value} geçerli bir URL değil!`,
      },
    },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
      required: true,
    },
    note: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true, // createdAt ve updatedAt alanlarını otomatik ekler
  }
);

// Modeli oluştur ve dışa aktar
const User = mongoose.model<IUser>('User', UserSchema);
export default User;
