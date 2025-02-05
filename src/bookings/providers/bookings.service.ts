import { Types } from 'mongoose';
import BookingModel from '../bookings.model';
import { IBooking } from '../interfaces/booking.interface';
import { IGetAllBookingQuery } from '../interfaces/get-all-bookings.interface';
import { getPaginationDataUtil } from '../../lib/utils/get-pagination-data.util';
import { mapBookingSortParametersHelper } from '../helpers/map-booking-sort-parameters.helper';

export class BookingsService {
  // find all bookings
  async findAllBookings(query: IGetAllBookingQuery) {
    const {
      hotel,
      isPaid,
      room,
      status,
      numOfNight,
      paymentDate,
      sort,
      limit,
      page,
      search,
    } = query;

    const filter: Record<string, any> = {};

    if (hotel) filter.hotel = new Types.ObjectId(hotel);
    if (room) filter.room = new Types.ObjectId(room);
    if (isPaid) filter.isPaid = isPaid;
    if (status) filter.status = status;
    if (numOfNight) filter.numOfNight = numOfNight;
    if (paymentDate) filter.paymentDate = { $gte: new Date(paymentDate) };

    if (search) {
      // todo: if needed
    }

    // pagination
    const { skip, _limit, totalPages, _page } = await getPaginationDataUtil(
      limit,
      page,
      BookingModel
    );

    // sort
    const _sort: Partial<Record<keyof IBooking, any>> =
      mapBookingSortParametersHelper(sort);

    const bookings = await BookingModel.find(filter)
      .sort(_sort)
      .skip(skip)
      .limit(_limit);

    return {
      pagination: {
        totalPages,
        limit: _limit,
        page: _page,
      },
      bookings,
    };
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
