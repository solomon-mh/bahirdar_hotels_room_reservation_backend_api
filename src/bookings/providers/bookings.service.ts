import BookingModel from '../bookings.model';
import { IBooking } from '../interfaces/booking.interface';

export class BookingsService {
  // find all bookings
  async findAllBookings() {
    const bookings = await BookingModel.find();
    return bookings;
  }
  // find booking
  async findBooking(id: string) {
    const booking = await BookingModel.findById(id);
    return booking;
  }
  // create booking
  async createBooking(data: IBooking) {
    const booking = await BookingModel.create(data);
    return booking;
  }
  // update booking
  async updateBooking(id: string, data: Partial<IBooking>) {
    const booking = await BookingModel.findByIdAndUpdate(id, data, {
      new: true,
    });
    return booking;
  }
  // delete booking
  async deleteBooking(id: string) {
    const booking = await BookingModel.findByIdAndDelete(id);
    return booking;
  }
  // find one
  async findOne(query: Partial<IBooking>) {
    const booking = await BookingModel.findOne(query);
    return booking;
  }
}
