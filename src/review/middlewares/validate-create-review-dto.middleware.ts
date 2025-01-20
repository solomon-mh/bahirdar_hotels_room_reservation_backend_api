import * as z from 'zod';
import { IReview } from '../interfaces/review.interface';

export const CreateReviewSchema = z.object({
  user: z
    .string({ message: 'user id is required' })
    .uuid({ message: 'Invalid user id' }),
  hotel: z
    .string({ message: 'hotel id is required' })
    .uuid({ message: 'Invalid hotel id' }),
  rating: z
    .number({ message: 'Rating is required' })
    .int()
    .min(1, { message: 'Rating must be at least 1' })
    .max(5, { message: 'Rating must be at most 5' }),
  comment: z
    .string({ message: 'Comment is required' })
    .min(10, { message: 'Comment must be at least 10 characters long' })
    .max(255, { message: 'Comment must be at most 255 characters long' }),
});

export function validateCreateReviewDto(createReviewDto: IReview) {
  const result = CreateReviewSchema.safeParse(createReviewDto);

  return result;
}
