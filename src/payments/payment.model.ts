import mongoose, { Model } from 'mongoose';
import { IPayment } from './interfaces/payment.interface';
import { Schema } from 'mongoose';
import { Gender } from '../lib/shared/gender.enum';
import validator from 'validator';
import { RoomType } from '../rooms/enums/room-type.enum';

interface IPaymentMethods {}

export interface IPaymentModel extends Model<IPayment, {}, IPaymentMethods> {}

const PaymentSchema = new Schema<IPayment, IPaymentModel>(
  {
    hotelId: {
      type: Schema.Types.ObjectId,
      ref: 'Hotel',
      required: [true, 'Hotel ID is required'],
    },
    roomId: {
      type: Schema.Types.ObjectId,
      ref: 'Room',
      required: [true, 'Room ID is required'],
    },
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
    dateOfBirth: {
      type: Date,
      required: [true, 'Date of birth is required'],
    },
    gender: {
      type: String,
      enum: Gender,
      required: [true, 'Gender is required'],
    },
    email: {
      type: String,
      trim: true,
      required: [true, 'Email is required'],
      validate: [validator.isEmail, 'Please provide a valid email'],
    },
    phoneNumber: {
      type: String,
      trim: true,
      required: [true, 'Phone number is required'],
    },
    hotelName: {
      type: String,
      trim: true,
      required: [true, 'Hotel name is required'],
    },
    summary: {
      type: String,
      trim: true,
      required: [true, 'Summary is required'],
    },
    roomNumber: {
      type: String,
      trim: true,
      required: [true, 'Room number is required'],
    },
    roomType: {
      type: String,
      trim: true,
      enum: RoomType,
      required: [true, 'Room type is required'],
    },
    roomFacilities: {
      type: [String],
      required: [true, 'Room facilities is required'],
    },
    capacity: {
      type: Number,
      required: [true, 'Capacity is required'],
    },
    checkIn: {
      type: Date,
      required: [true, 'Check in date is required'],
    },
    checkOut: {
      type: Date,
      required: [true, 'Check out date is required'],
    },
    totalPrice: {
      type: Number,
      required: [true, 'Total price is required'],
    },
    pricePerNight: {
      type: Number,
      required: [true, 'Price per night is required'],
    },
    numOfNights: {
      type: Number,
      required: [true, 'Number of nights is required'],
      min: [1, 'Number of nights must be greater than 0'],
    },
  },
  {
    timestamps: true,
  }
);

const PaymentModel = mongoose.model<IPayment, IPaymentModel>(
  'Payment',
  PaymentSchema
);

export default PaymentModel;
