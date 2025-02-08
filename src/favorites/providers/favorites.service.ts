import FavoriteModel from '../favorites.model';
import { IFavorite } from '../interfaces/favorites.interface';

export class FavoritesService {
  // find all favorites
  async findAll() {
    const favorites = await FavoriteModel.find();

    return favorites;
  }
  // find favorite
  async findOneById(id: string) {
    const favorite = await FavoriteModel.findById(id);

    return favorite;
  }
  // create favorite
  async create(favoriteData: IFavorite) {
    const favorite = await FavoriteModel.create(favoriteData);

    return favorite;
  }
  // update favorite
  async update(id: string, favoriteData: Partial<IFavorite>) {
    const favorite = await FavoriteModel.findByIdAndUpdate(id, favoriteData, {
      new: true,
    });

    return favorite;
  }
  // delete favorite
  async delete(id: string) {
    const favorite = await FavoriteModel.findByIdAndDelete(id);

    return favorite;
  }
  // find one
  async findOne(filter: Partial<IFavorite>) {
    const favorite = await FavoriteModel.findOne(filter);
    return favorite;
  }
}
