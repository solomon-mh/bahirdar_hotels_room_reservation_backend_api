import { Request, Response } from "express";
import BookingModel from "../../bookings/bookings.model";
import FavoriteModel from "../../favorites/favorites.model";
import HotelModel from "../../hotels/hotels.model";
import { IBooking } from "../../bookings/interfaces/booking.interface";
import { IHotel } from "../../hotels/interfaces/hotel.interface";
import { IUser } from "../../users/interfaces/user.interface";

interface IPopulatedBooking extends Omit<IBooking, "hotel"> {
  hotel: IHotel;
}
interface IPopulatedFavorite extends Omit<IBooking, "hotel"> {
  hotel: IHotel;
}

export async function personalRecommendationsProvider(
  req: Request,
  res: Response
) {
  console.log("personal-recommendations.provider...");
  try {
    const user = req.user as IUser;
    /* 
    i want to get a personalized recommendation of hotels on my home page
    i want to see hotels that i have booked in the past
    i want to see hotels that i have favorites in the past

    todo: i want to get hotels related to the hotels i have booked or favorites like by their name, hotel star, hotel price
    and finally to get the top 6 hotels based on the above criteria
   */
    const bookings = (await BookingModel.find({ user: user._id }).populate(
      "hotel"
    )) as unknown as IPopulatedBooking[];
    const favorites = (await FavoriteModel.find({ user: user._id }).populate(
      "hotel"
    )) as unknown as IPopulatedFavorite[];

    const bookedHotels = bookings.map((booking) => booking.hotel);
    const favoriteHotels = favorites.map((favorite) => favorite.hotel);

    // get hotels based on avgRating, hotelStar, minPricePerNight from hight to low
    const popularHotels = (await HotelModel.find()
      .sort({
        avgRating: -1,
        hotelStar: -1,
        minPricePerNight: 1,
      })
      .limit(6)) as unknown as IHotel[];

    const hotels = [...bookedHotels, ...favoriteHotels, ...popularHotels];

    /* 
      if their is a duplicate hotel, the same hotel twice, i want them to be removed
    */
    const uniqueHotels = hotels.filter(
      (hotel, index, self) =>
        index === self.findIndex((t) => t.name === hotel.name)
    );

    res.status(200).json({
      status: "success",
      data: uniqueHotels.slice(0, 6),
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "error",
      message: (err as Error).message,
    });
  }
}
