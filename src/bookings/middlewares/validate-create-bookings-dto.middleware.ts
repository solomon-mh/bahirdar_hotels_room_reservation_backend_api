import * as z from 'zod';
import { BookingStatus } from '../enums/booking-status.enum';

export const CreateBookingSchema = z.object({
  room: z.string({ message: 'room id is required' }),
  checkIn: z
    .string({ message: 'check in date is required' })
    .datetime({ message: 'Invalid date format' }),
  checkOut: z
    .string({ message: 'check out date is required' })
    .datetime({ message: 'Invalid date format' }),
  status: z
    .enum(Object.values(BookingStatus) as [BookingStatus, ...BookingStatus[]], {
      message: 'Invalid status',
    })
    .default(BookingStatus.PENDING),
});

export function validateCreateBookingDto(createBookingDto: any) {
  const result = CreateBookingSchema.safeParse(createBookingDto);

  return result;
}
