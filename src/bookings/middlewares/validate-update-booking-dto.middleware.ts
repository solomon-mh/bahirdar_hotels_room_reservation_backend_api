import { CreateBookingSchema } from './validate-create-bookings-dto.middleware';

const UpdateBookingSchema = CreateBookingSchema.partial();

export function validateUpdateBookingDto(updateBookingDto: any) {
  const result = UpdateBookingSchema.safeParse(updateBookingDto);

  return result;
}
