import * as z from 'zod';
import { AddressZodSchema } from '../../users/middleware/validate-create-user-dto.middleware';
import { IHotel } from '../interfaces/hotel.interface';

export const CreateHotelSchema = z.object({
  name: z
    .string({ message: 'hotel name is required' })
    .min(3, { message: 'hotel name must be at least 3 characters long' })
    .max(255, { message: 'hotel name must be at most 255 characters long' }),
  hotelStar: z.optional(
    z.coerce
      .number({
        message: 'hotel star must be a number',
      })
      .int({ message: 'hotel star must be an integer' })
      .min(1, { message: 'hotel star must be at least 1' })
      .max(5, { message: 'hotel star must be at most 5' })
  ),
  address: AddressZodSchema,
  summary: z
    .string({ message: 'hotel summary is required' })
    .min(20, { message: 'hotel summary must be at least 20 characters long' }),
  description: z.string({ message: 'hotel description is required' }).min(50, {
    message: 'hotel description must be at least 50 characters long',
  }),
  facilities: z
    .array(z.string(), { message: 'hotel facilities are required' })
    .min(3, { message: 'hotel must have at least 3 facilities' }),
  manager: z.string({ message: 'hotel manager is required' }),
});

export function validateCreateHotelDto(createHotelDto: IHotel) {
  const result = CreateHotelSchema.safeParse(createHotelDto);

  return result;
}
