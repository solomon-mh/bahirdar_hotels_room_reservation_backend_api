import * as z from 'zod';
import { AddressZodSchema } from '../../users/middleware/validate-create-user-dto.middleware';
import { IHotel } from '../interfaces/hotel.interface';

export const CreateHotelSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'hotel name must be at least 3 characters long' })
    .max(255, { message: 'hotel name must be at most 255 characters long' }),
  hotelStar: z.optional(z.number().int().min(1).max(5)),
  address: AddressZodSchema,
  summary: z
    .string()
    .min(20, { message: 'hotel summary must be at least 20 characters long' })
    .max(120, { message: 'hotel summary must be at most 120 characters long' }),
  description: z
    .string()
    .min(50, {
      message: 'hotel description must be at least 50 characters long',
    })
    .max(255, {
      message: 'hotel description must be at most 255 characters long',
    }),
  facilities: z
    .array(z.string())
    .min(3, { message: 'hotel must have at least 3 facilities' }),
  manager: z.string().uuid({ message: 'Invalid manager id' }),
});

export function validateCreateHotelDto(createHotelDto: IHotel) {
  const result = CreateHotelSchema.safeParse(createHotelDto);

  return result;
}
