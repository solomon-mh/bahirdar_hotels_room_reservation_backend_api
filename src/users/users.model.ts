import crypto from "crypto";
import bcrypt from "bcryptjs";
import mongoose, { Schema, Model, Document } from "mongoose";
import validator from "validator";

import { IUser } from "./interfaces/user.interface";
import { Gender } from "../lib/shared/gender.enum";
import { UserRole } from "./enums/user-role.enum";
import { DEFAULT_USER_AVATAR } from "../lib/constants/constants";
import { AddressSchema } from "../lib/shared/address.schema";

export interface IUserModel extends Model<IUser & Document> {}

const UserSchema: Schema<IUser> = new Schema<IUser>(
  {
    firstName: {
      type: String,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
    username: {
      type: String,
      trim: true,
      required: [true, "Username is required"],
      unique: true,
    },
    dateOfBirth: {
      type: Date,
    },
    gender: {
      type: String,
      enum: Gender,
    },
    email: {
      type: String,
      trim: true,
      required: [true, "Email is required"],
      unique: true,
      validate: [validator.isEmail, "Please provide a valid email"],
    },
    phoneNumber: {
      type: String,
      trim: true,
    },
    googleId: { type: String, required: false, unique: true, sparse: true },
    password: {
      type: String,
      required: [
        function (this: IUser) {
          // Password is required if googleId is not present
          return !this.googleId;
        },
        "Password is required",
      ],
    },
    role: {
      type: String,
      enum: UserRole,
      default: UserRole.USER,
    },
    profilePicture: {
      type: String,
      default: DEFAULT_USER_AVATAR,
    },
    address: {
      type: AddressSchema,
    },

    isOnboarding: {
      type: Boolean,
      default: true,
    },
    // todo: /
    // isEmailVerified: {
    //   type: Boolean,
    //   default: false,
    // },
    hotel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hotel",
    },

    idPhoto_back: String,
    idPhoto_front: String,

    isVerificationRequested: {
      type: Boolean,
      default: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    verifiedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    passwordResetToken: String,
    passwordResetExpires: Date,
  },
  {
    timestamps: true,
  }
);

// Hash the password before save
UserSchema.pre("save", async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified("password")) return next();

  // Hash the password with cost of 12
  const salt = await bcrypt.genSalt(12);
  const hashedPassword = await bcrypt.hash(this.password as string, salt);
  this.password = hashedPassword;

  next();
});

UserSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const UserModel: Model<IUserModel> = mongoose.model<IUserModel>(
  "User",
  UserSchema
);

export default UserModel;
