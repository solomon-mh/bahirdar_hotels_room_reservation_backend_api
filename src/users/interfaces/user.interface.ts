import { Types } from "mongoose";
import { AddressInterface } from "../../lib/shared/address.interface";
import { Gender } from "../../lib/shared/gender.enum";
import { UserRole } from "../enums/user-role.enum";

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

  googleId?: string;

  idPhoto_front: string;
  idPhoto_back: string;
  isVerified: boolean;

  verifiedBy: Types.ObjectId;

  isOnboarding: boolean;

  passwordResetToken: string;
  passwordResetExpires: Date;

  isVerificationRequested: boolean;

  hotel?: Types.ObjectId;

  createdAt?: Date;
  updatedAt?: Date;
}
