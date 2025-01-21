import mongoose, { Model, Schema } from 'mongoose';
import { IReview } from './interfaces/review.interface';
import HotelModel from '../hotels/hotels.model';

interface IReviewMethods {
  // Instance methods (if any) can be added here
}

/* 
interface IUserMethods {
  fullName(): string;
}
interface UserModel extends Model<IUser, {}, IUserMethods> {
  createWithFullName(name: string): Promise<HydratedDocument<IUser, IUserMethods>>;
}
const schema = new Schema<IUser, UserModel, IUserMethods>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true }
});
schema.static('createWithFullName', function createWithFullName(name: string) {
  const [firstName, lastName] = name.split(' ');
  return this.create({ firstName, lastName });
});
schema.method('fullName', function fullName(): string {
  return this.firstName + ' ' + this.lastName;
});
schema.method('fullName', function fullName(): string {
  return this.firstName + ' ' + this.lastName;
});
 */

export interface IReviewModel extends Model<IReview, {}, IReviewMethods> {
  calcAvgRating(hotelId: mongoose.Types.ObjectId): Promise<void>;
}

const ReviewSchema = new Schema<IReview, IReviewModel, IReviewMethods>(
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

// calculate avg rating and number of ratings for a hotel
ReviewSchema.static(
  'calcAvgRating',
  async function (hotelId: mongoose.Types.ObjectId) {
    const stats = await this.aggregate([
      { $match: { hotel: hotelId } },
      {
        $group: {
          _id: '$hotel',
          nRating: { $sum: 1 },
          avgRating: { $avg: '$rating' },
        },
      },
    ]);

    if (stats.length > 0) {
      await HotelModel.findByIdAndUpdate(hotelId, {
        numOfRatings: stats[0].nRating,
        avgRating: Math.floor(stats[0].avgRating * 10) / 10,
      });
    } else {
      await HotelModel.findByIdAndUpdate(hotelId, {
        numOfRatings: 0,
        avgRating: 4.5,
      });
    }
  }
);

ReviewSchema.pre('save', function (next) {
  const Review = this.constructor as IReviewModel;
  Review.calcAvgRating(this.hotel);

  next();
});

const ReviewModel = mongoose.model<IReview, IReviewModel>(
  'Review',
  ReviewSchema
);

export default ReviewModel;
