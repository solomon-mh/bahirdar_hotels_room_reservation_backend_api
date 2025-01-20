import mongoose, { Document, Model, Schema } from 'mongoose';
import { IReview } from './interfaces/review.interface';

interface IReviewModel extends Model<IReview, Document> {}

const ReviewSchema: Schema<IReview> = new Schema<IReview>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User is required'],
    },
    hotel: {
      type: Schema.Types.ObjectId,
      ref: 'Hotel',
      required: [true, 'Hotel is required'],
    },
    rating: {
      type: Number,
      required: [true, 'Rating is required'],
    },
    comment: {
      type: String,
      required: [true, 'Comment is required'],
    },
  },
  {
    timestamps: true,
  }
);

const ReviewModel: Model<IReviewModel> = mongoose.model<IReviewModel>(
  'Review',
  ReviewSchema
);

export default ReviewModel;
