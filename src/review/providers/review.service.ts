import { IReview } from '../interfaces/review.interface';
import { CreateReviewDto } from '../middlewares/validate-create-review-dto.middleware';
import ReviewModel from '../review.model';

export class ReviewService {
  // find all reviews
  async findAllReviews() {
    const reviews = await ReviewModel.find();
    return reviews;
  }
  // find review
  async findReview(id: string) {
    const review = await ReviewModel.findById(id);
    return review;
  }
  // create review
  async createReview(data: CreateReviewDto) {
    const review = await ReviewModel.create(data);
    return review;
  }
  // update review
  async updateReview(id: string, data: Partial<IReview>) {
    const review = await ReviewModel.findByIdAndUpdate(id, data, { new: true });
    return review;
  }
  // delete review
  async deleteReview(id: string) {
    const review = await ReviewModel.findByIdAndDelete(id);
    return review;
  }

  // find one
  async findOne(filter: Partial<IReview>) {
    const review = await ReviewModel.findOne(filter);
    return review;
  }
}
