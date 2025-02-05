import { HotelSortEnum } from '../enums/hotel-sort.enum';
import { IHotel } from '../interfaces/hotel.interface';

export function mapHotelSortParametersHelper(sort: string | undefined) {
  const _sort: Partial<Record<keyof IHotel, any>> = {};

  if (sort) {
    const sortArray = sort.split(',');
    sortArray.forEach((sortOption) => {
      // sort hotel by name
      if (sortOption === HotelSortEnum.A_Z) {
        _sort.name = 1;
      } else if (sortOption === HotelSortEnum.Z_A) {
        _sort.name = -1;
      }

      // sort hotel by its update date
      if (sortOption === HotelSortEnum.NEWEST) {
        _sort.updatedAt = -1;
      } else if (sortOption === HotelSortEnum.OLDEST) {
        _sort.updatedAt = 1;
      }

      // sort by min price per night
      if (sortOption === HotelSortEnum.MIN_PRICE_PER_NIGHT_DESC) {
        _sort.minPricePerNight = -1;
      } else if (sortOption === HotelSortEnum.MIN_PRICE_PER_NIGHT_ASC) {
        _sort.minPricePerNight = 1;
      }

      // sort by avg rating
      if (sortOption === HotelSortEnum.AVG_RATING_DESC) {
        _sort.avgRating = -1;
      } else if (sortOption === HotelSortEnum.AVG_RATING_ASC) {
        _sort.avgRating = 1;
      }

      // sort by hotel star
      if (sortOption === HotelSortEnum.HOTEL_STAR_DESC) {
        _sort.hotelStar = -1;
      } else if (sortOption === HotelSortEnum.HOTEL_STAR_ASC) {
        _sort.hotelStar = 1;
      }

      // sort by number of rooms
      if (sortOption === HotelSortEnum.NUM_OF_ROOMS_DESC) {
        _sort.numOfRooms = -1;
      } else if (sortOption === HotelSortEnum.NUM_OF_ROOMS_ASC) {
        _sort.numOfRooms = 1;
      }
    });
  } else {
    _sort.avgRating = -1;
  }

  return _sort;
}
