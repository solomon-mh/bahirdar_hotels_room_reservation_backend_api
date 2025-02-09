import { Types } from 'mongoose';
import HotelModel from '../hotels.model';
import { IHotel } from '../interfaces/hotel.interface';
import { IRoom } from '../../rooms/interface/room.interface';
import { IBooking } from '../../bookings/interfaces/booking.interface';
import { IReview } from '../../review/interfaces/review.interface';
import UserModel from '../../users/users.model';
import { UserRole } from '../../users/enums/user-role.enum';
import RoomModel from '../../rooms/room.model';
import BookingModel from '../../bookings/bookings.model';
import ReviewModel from '../../review/review.model';

export interface ICascadeOnDeleteHotelProvider extends IHotel {
  rooms: IRoom[];
  bookings: IBooking[];
  reviews: IReview[];
}

export interface CascadeHotelResponse {
  status: 'success' | 'fail' | 'error';
  message: string;
}

export async function cascadeOnDeleteHotelProvider(
  id: string
): Promise<CascadeHotelResponse> {
  console.log('cascade on delete hotel...');
  try {
    const hotel = await HotelModel.aggregate([
      {
        $match: { _id: new Types.ObjectId(id) },
      },
      {
        $lookup: {
          from: 'rooms',
          localField: '_id',
          foreignField: 'hotel',
          as: 'rooms',
        },
      },
      {
        $lookup: {
          from: 'bookings',
          localField: '_id',
          foreignField: 'hotel',
          as: 'bookings',
        },
      },
      {
        $lookup: {
          from: 'reviews',
          localField: '_id',
          foreignField: 'hotel',
          as: 'reviews',
        },
      },
    ]);

    const hotelDetails = hotel[0] as any as ICascadeOnDeleteHotelProvider;

    if (!hotelDetails) {
      return {
        status: 'fail',
        message: 'hotel not found',
      };
    }
    // WE UPDATE THE MANAGER TO A USER AND DELETE THE LINKED HOTEL
    await UserModel.findByIdAndUpdate(
      (hotel as unknown as IHotel).manager.toString(),
      {
        role: UserRole.USER,
        hotel: undefined,
      }
    );

    // CASCADE ROOM DELETION
    await Promise.all(
      hotelDetails.rooms?.map(async (room) => {
        await RoomModel.findByIdAndDelete(room._id);
      })
    );

    // CASCADE BOOKING DELETION
    await Promise.all(
      hotelDetails.bookings?.map(async (booking) => {
        await BookingModel.findByIdAndDelete(booking._id);
      })
    );

    // CASCADE REVIEW DELETION
    await Promise.all(
      hotelDetails.reviews?.map(async (review) => {
        await ReviewModel.findByIdAndDelete(review._id);
      })
    );

    return {
      status: 'success',
      message: 'hotel deleted',
    };
  } catch (err) {
    console.log(err);
    return {
      status: 'error',
      message: (err as Error).message,
    };
  }
}
