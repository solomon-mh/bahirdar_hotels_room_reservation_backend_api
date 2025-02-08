import { RoomSortEnum } from '../enums/room-sort.enum';
import { IRoom } from '../interface/room.interface';

export function mapRoomSortParametersHelper(sort: string | undefined) {
  const _sort: Partial<Record<keyof IRoom, any>> = {};

  if (sort) {
    const sortArray = sort.split(',');
    sortArray.forEach((sortOption) => {
      // sort room by room number
      if (sortOption === RoomSortEnum.NEWEST) {
        _sort.updatedAt = -1;
      } else if (sortOption === RoomSortEnum.OLDEST) {
        _sort.updatedAt = 1;
      }

      // sort by room capacity
      if (sortOption === RoomSortEnum.CAPACITY_DESC) {
        _sort.capacity = -1;
      } else if (sortOption === RoomSortEnum.CAPACITY_ASC) {
        _sort.capacity = 1;
      }

      // sort by price per night
      if (sortOption === RoomSortEnum.PRICE_PER_NIGHT_DESC) {
        _sort.pricePerNight = -1;
      } else if (sortOption === RoomSortEnum.PRICE_PER_NIGHT_ASC) {
        _sort.pricePerNight = 1;
      }

      // sort by room number
      if (sortOption === RoomSortEnum.ROOM_NUMBER_DESC) {
        _sort.roomNumber = -1;
      } else if (sortOption === RoomSortEnum.ROOM_NUMBER_ASC) {
        _sort.roomNumber = 1;
      }
    });
  } else {
    _sort.roomNumber = 1;
  }

  return _sort;
}
