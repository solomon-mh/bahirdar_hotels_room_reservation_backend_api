import * as dotenv from 'dotenv';
dotenv.config();

import UserModel from './users/users.model';
import { IUser } from './users/interfaces/user.interface';
import { UserRole } from './users/enums/user-role.enum';

export async function createAdmin() {
  const numOfUsers = await UserModel.countDocuments();

  const adminData: Partial<IUser> = {
    username: 'admin',
    role: UserRole.ADMIN,
    email: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD,
    isVerified: true,
    isOnboarding: false,
    isVerificationRequested: false,
  };

  if (numOfUsers === 0) {
    await UserModel.create(adminData);
    console.log('admin created successfully');
  }
}
