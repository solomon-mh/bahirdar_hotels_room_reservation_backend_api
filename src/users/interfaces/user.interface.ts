import { Types } from 'mongoose';
import { AddressInterface } from '../../lib/shared/address.interface';
import { Gender } from '../enums/gender.enum';
import { UserRole } from '../enums/user-role.enum';

export interface IUser {
  _id?: string;

  firstName: string;
  lastName: string;
  username: string;
  dateOfBirth: Date;
  gender: Gender;
  email: string;
  phoneNumber: string;
  password: string;
  passwordConfirm?: string;
  role: UserRole;
  profilePicture: string;
  address: AddressInterface;

  idPhoto: string;
  isVerified: boolean;

  isOnboarding?: boolean;

  passwordResetToken: string;
  passwordResetExpires: Date;

  hotel?: Types.ObjectId;

  createdAt?: Date;
  updatedAt?: Date;
}
