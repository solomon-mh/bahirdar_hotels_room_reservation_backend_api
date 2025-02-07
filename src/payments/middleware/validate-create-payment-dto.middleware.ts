import * as z from 'zod';
import { Gender } from '../../lib/shared/gender.enum';

export const createPaymentSchema = z.object({
  hotelId: z.string({ message: 'hotel id is required' }),
  roomId: z.string({ message: 'room id is required' }),

  firstName: z.string({ message: 'first name is required' }),
  lastName: z.string({ message: 'last name is required' }),
  email: z
    .string({ message: 'email is required' })
    .email({ message: 'Invalid email format' }),
  dateOfBirth: z
    .string({ message: 'date of birth is required' })
    .datetime({ message: 'Invalid date format' }),
  phoneNumber: z.string({ message: 'phone number is required' }),
  gender: z.enum(Object.values(Gender) as [Gender, ...Gender[]], {
    message: 'Invalid gender, it should be either male or female',
  }),

  hotelName: z.string({ message: 'hotel name is required' }),
  hotelSummary: z.string({ message: 'summary is required' }),
  roomNumber: z.string({ message: 'room number is required' }),
  roomType: z.string({ message: 'room type is required' }),
  roomFacilities: z.array(z.string(), {
    message: 'room facilities are required',
  }),
  capacity: z.coerce.number({
    message: 'capacity must be a number',
  }),
  checkIn: z
    .string({ message: 'check in date is required' })
    .datetime({ message: 'Invalid date format' }),
  checkOut: z
    .string({ message: 'check out date is required' })
    .datetime({ message: 'Invalid date format' }),
  totalPrice: z.coerce.number({
    message: 'total price must be a number',
  }),
  pricePerNight: z.coerce.number({
    message: 'price per night must be a number',
  }),
  numOfNights: z.coerce.number({
    message: 'number of nights must be a number',
  }),
});

// export interface createPaymentDto = z.infer<typeof createPaymentSchema>;
export type CreatePaymentDto = z.infer<typeof createPaymentSchema>;

export function validateCreatePaymentDto(createPaymentDto: CreatePaymentDto) {
  const result = createPaymentSchema.safeParse(createPaymentDto);

  return result;
}
