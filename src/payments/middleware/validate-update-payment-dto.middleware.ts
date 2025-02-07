import * as z from 'zod';
import { createPaymentSchema } from './validate-create-payment-dto.middleware';

const updatePaymentSchema = createPaymentSchema.partial();

export type UpdatePaymentDto = z.infer<typeof updatePaymentSchema>;

export function validateUpdatePaymentDto(updatePaymentDto: UpdatePaymentDto) {
  const data = updatePaymentSchema.safeParse(updatePaymentDto);
  return data;
}
