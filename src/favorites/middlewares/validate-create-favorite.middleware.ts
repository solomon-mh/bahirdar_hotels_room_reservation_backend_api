import * as z from 'zod';
import { IFavorite } from '../interfaces/favorites.interface';

const CreateFavoriteSchema = z.object({
  hotel: z.string({ message: 'Hotel is required' }),
});

export const validateCreateFavoriteDto = (createFavoriteDto: IFavorite) => {
  const result = CreateFavoriteSchema.safeParse(createFavoriteDto);
  return result;
};
