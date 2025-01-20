import { IReview } from '../interfaces/review.interface';
import { CreateReviewSchema } from './validate-create-review-dto.middleware';

const UpdateReviewSchema = CreateReviewSchema.partial();

export function validateUpdateReviewDto(updateReviewDto: Partial<IReview>) {
  const result = UpdateReviewSchema.safeParse(updateReviewDto);

  return result;
}
