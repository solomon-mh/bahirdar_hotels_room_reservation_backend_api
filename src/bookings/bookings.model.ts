import mongoose, { Document, Model, Schema } from 'mongoose';
import { IBooking } from './interfaces/booking.interface';
import { BookingStatus } from './enums/booking-status.enum';
import RoomModel from '../rooms/room.model';

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

    // ****************************************************** //

    isPaid: {
      type: Boolean,
      default: false,
    },

    paymentDate: {
      type: Date,
    },

    // we calculate this from the two dates
    numOfNights: {
      type: Number,
      min: [1, 'a book must be at least one night '],
    },

    hotel: {
      type: mongoose.Schema.ObjectId,
      ref: 'Hotel',
    },

    // this will be calculated from the price per night of the room and the num of nights
    totalPrice: {
      type: Number,
    },

    // we get this prop from the room on the creation of a book
    pricePerNight: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

// calculate the number of nights from the checkOut and checkIn date
BookingSchema.pre('save', function (next) {
  const checkInDate = new Date(this.checkIn);
  const checkOutDate = new Date(this.checkOut);

  // if check in date and check out date are the same, i.e. the number of nights that the guest will stay wil be one night only
  // otherwise if the user selects today and next day the difference will be one but we need to add one to make it 2 nights  or days
  const numOfNights =
    checkOutDate.getTime() === checkInDate.getTime()
      ? 1
      : Math.floor(
          (checkOutDate.getTime() - checkInDate.getTime()) /
            (24 * 60 * 60 * 1000) +
            1
        );

  if (numOfNights < 1) {
    throw new Error('number of nights must be at least one night');
  }

  this.numOfNights = numOfNights;

  next();
});

// CALCULATE THE TOTAL PRICE BEFORE SAVE
BookingSchema.pre('save', async function (next) {
  const room = await RoomModel.findById(this.room);

  if (!room) {
    throw new Error('there is no room found with that id');
  }

  if (!this.numOfNights || this.numOfNights < 1) {
    throw new Error('number of nights must be at least one night');
  }

  this.pricePerNight = room.pricePerNight;
  this.totalPrice = room.pricePerNight * this.numOfNights;
  next();
});

const BookingModel: Model<IBookingModel> = mongoose.model<IBookingModel>(
  'Booking',
  BookingSchema
);

export default BookingModel;
