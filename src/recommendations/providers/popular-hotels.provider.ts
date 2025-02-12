import { Request, Response } from 'express';
import HotelModel from '../../hotels/hotels.model';
import { IHotel } from '../../hotels/interfaces/hotel.interface';

export async function popularHotelsProvider(req: Request, res: Response) {
  console.log('popular-hotels.provider...');
  try {
    // get hotels based on avgRating, hotelStar, minPricePerNight from hight to low
    const popularHotels = (await HotelModel.find()
      .sort({
        avgRating: -1,
        hotelStar: -1,
        minPricePerNight: 1,
      })
      .limit(6)) as unknown as IHotel[];

    res.status(200).json({
      status: 'success',
      data: popularHotels,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: 'error',
      message: (err as Error).message,
    });
  }
}
