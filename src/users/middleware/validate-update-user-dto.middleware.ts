import { IUser } from '../interfaces/user.interface';
import { createUserSchema } from './validate-create-user-dto.middleware';

const updateUserSchema = createUserSchema.partial();

export function validateUpdateUserDto(updateUserDto: Partial<IUser>) {
  const data = updateUserSchema.safeParse(updateUserDto);
  return data;
}
