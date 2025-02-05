import { BookingSortEnum } from '../enums/booking-sort.enum';
import { IBooking } from '../interfaces/booking.interface';

export function mapBookingSortParametersHelper(sort: string | undefined) {
  const _sort: Partial<Record<keyof IBooking, any>> = {};

  if (sort) {
    const sortArray = sort.split(',');
    sortArray.forEach((sortOption) => {
      if (sortOption === BookingSortEnum.PRICE_PER_NIGHT_ASC) {
        _sort.pricePerNight = 1;
      } else if (sortOption === BookingSortEnum.PRICE_PER_NIGHT_DESC) {
        _sort.pricePerNight = -1;
      }

      if (sortOption === BookingSortEnum.TOTAL_PRICE_ASC) {
        _sort.totalPrice = 1;
      } else if (sortOption === BookingSortEnum.TOTAL_PRICE_DESC) {
        _sort.totalPrice = -1;
      }
    });
  } else {
    _sort.updatedAt = -1;
  }

  return _sort;
}
