import mongoose, { Model } from 'mongoose';
import { IFavorite } from './interfaces/favorites.interface';
import { Schema } from 'mongoose';

export interface IFavoriteModel extends Model<IFavorite> {}

const FavoriteSchema = new Schema<IFavorite, IFavoriteModel>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    hotel: {
      type: Schema.Types.ObjectId,
      ref: 'Hotel',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const FavoriteModel = mongoose.model<IFavorite, IFavoriteModel>(
  'Favorite',
  FavoriteSchema
);

export default FavoriteModel;
