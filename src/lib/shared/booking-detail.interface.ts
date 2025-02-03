import { Types } from 'mongoose';
import { IBooking } from '../../bookings/interfaces/booking.interface';
import { IRoom } from '../../rooms/interface/room.interface';
import { IUser } from '../../users/interfaces/user.interface';
import { IHotel } from '../../hotels/interfaces/hotel.interface';

export interface IBookingDetail
  extends Omit<IBooking, 'room' | 'user' | 'hotel' | '_id'> {
  _id: Types.ObjectId;
  room: IRoom;
  user: IUser;
  hotel: IHotel;
}
