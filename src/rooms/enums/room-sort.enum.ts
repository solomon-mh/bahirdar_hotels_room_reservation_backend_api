export enum RoomSortEnum {
  NEWEST = 'newest', // sort by newest room first
  OLDEST = 'oldest', // sort by oldest room first

  CAPACITY_DESC = 'capacity-desc', // sort by room capacity from high to low
  CAPACITY_ASC = 'capacity-asc', // sort by room capacity from low to high

  PRICE_PER_NIGHT_DESC = 'pricePerNight-desc', // sort by price per night from high to low
  PRICE_PER_NIGHT_ASC = 'pricePerNight-asc', // sort by price per night from low to high

  // roomNumber
  ROOM_NUMBER_DESC = 'roomNumber-desc', // sort by room number from high to low
  ROOM_NUMBER_ASC = 'roomNumber-asc', // sort by room number from low to high
}
