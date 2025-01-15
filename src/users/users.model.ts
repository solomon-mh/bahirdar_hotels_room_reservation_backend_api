import { IUser } from './interfaces/user.interface';
import mongoose, { Schema, Model, Document } from 'mongoose';
import { Gender } from './enums/gender.enum';
import { UserRole } from './enums/user-role.enum';
import { DEFAULT_USER_AVATAR } from '../lib/constants/constants';
import { AddressSchema } from '../lib/shared/address.schema';

export interface IUserModel extends Model<IUser & Document> {}

const UserSchema: Schema<IUser> = new Schema<IUser>(
  {
    firstName: {
      type: String,
      trim: true,
      required: [true, 'First name is required'],
    },
    lastName: {
      type: String,
      trim: true,
      required: [true, 'Last name is required'],
    },
    username: {
      type: String,
      trim: true,
      required: [true, 'Username is required'],
      unique: true,
    },
    dateOfBirth: {
      type: Date,
      required: [true, 'Date of birth is required'],
    },
    gender: {
      type: String,
      required: [true, 'gender is required'],
      enum: Gender,
    },
    email: {
      type: String,
      trim: true,
      required: [true, 'Email is required'],
      unique: true,
    },
    phoneNumber: {
      type: String,
      trim: true,
      required: [true, 'Phone number is required'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    role: {
      type: String,
      required: [true, 'Role is required'],
      enum: UserRole,
      default: UserRole.USER,
    },
    profilePicture: {
      type: String,
      default: DEFAULT_USER_AVATAR,
    },
    address: {
      type: AddressSchema,
      required: [true, 'Address is required'],
    },

    passwordResetToken: String,
    passwordResetExpires: Date,
  },
  {
    timestamps: true,
  }
);

const UserModel: Model<IUserModel> = mongoose.model<IUserModel>(
  'User',
  UserSchema
);

export default UserModel;
