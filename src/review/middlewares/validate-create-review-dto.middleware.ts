import * as z from 'zod';

export const CreateReviewSchema = z.object({
  user: z.string({ message: 'user id is required' }),
  hotel: z.string({ message: 'hotel id is required' }),
  rating: z.coerce
    .number({ message: 'Rating is required' })
    .int()
    .min(1, { message: 'Rating must be at least 1' })
    .max(5, { message: 'Rating must be at most 5' }),
  comment: z.string({ message: 'Comment is required' }),
});

export type CreateReviewDto = z.infer<typeof CreateReviewSchema>;

export function validateCreateReviewDto(createReviewDto: CreateReviewDto) {
  const result = CreateReviewSchema.safeParse(createReviewDto);

  return result;
}
