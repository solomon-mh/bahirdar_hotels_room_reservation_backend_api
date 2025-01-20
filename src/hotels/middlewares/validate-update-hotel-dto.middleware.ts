import { IHotel } from '../interfaces/hotel.interface';
import { CreateHotelSchema } from './validate-create-hotel-dto.middleware';

const UpdateHotelSchema = CreateHotelSchema.partial();

export function validateUpdateHotelDto(updateHotelDto: Partial<IHotel>) {
  const result = UpdateHotelSchema.safeParse(updateHotelDto);

  return result;
}
