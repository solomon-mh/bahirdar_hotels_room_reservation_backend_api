import mongoose, { Document, Model, Schema } from 'mongoose';
import { IBooking } from './interfaces/booking.interface';
import { BookingStatus } from './enums/booking-status.enum';

export interface IBookingModel extends Model<IBooking, Document> {}

const BookingSchema: Schema<IBooking> = new Schema<IBooking>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    room: {
      type: Schema.Types.ObjectId,
      ref: 'Room',
      required: true,
    },
    checkIn: {
      type: Date,
      required: true,
    },
    checkOut: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: BookingStatus,
      default: BookingStatus.PENDING,
    },
  },
  {
    timestamps: true,
  }
);

const BookingModel: Model<IBookingModel> = mongoose.model<IBookingModel>(
  'Booking',
  BookingSchema
);

export default BookingModel;
