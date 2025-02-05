export enum HotelSortEnum {
  A_Z = 'a-z', // sort by hotel name from a to z
  Z_A = 'z-a', // sort by hotel name from z to a
  NEWEST = 'newest', // sort by newest hotel first
  OLDEST = 'oldest', // sort by oldest hotel first
  MIN_PRICE_PER_NIGHT_DESC = 'minPricePerNight-desc', // sort by min price per night from high to low
  MIN_PRICE_PER_NIGHT_ASC = 'minPricePerNight-asc', // sort by min price per night from low to high
  AVG_RATING_DESC = 'avgRating-desc', // sort by avg rating from high to low
  AVG_RATING_ASC = 'avgRating-asc', // sort by avg rating from low to high
  HOTEL_STAR_DESC = 'hotelStar-desc', // sort by hotel star from high to low
  HOTEL_STAR_ASC = 'hotelStar-asc', // sort by hotel star from low to high

  NUM_OF_ROOMS_DESC = 'numOfRooms-desc', // sort by hotel room from high to low
  NUM_OF_ROOMS_ASC = 'numOfRooms-asc', // sort by hotel room from low to high
}
