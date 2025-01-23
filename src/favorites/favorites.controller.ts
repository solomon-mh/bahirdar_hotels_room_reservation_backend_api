import { Request, Response } from 'express';
import { FavoritesService } from './providers/favorites.service';
import { IFavorite } from './interfaces/favorites.interface';
import { getFavoriteByUserProvider } from './providers/get-favorite-by-user.provider';
import { Types } from 'mongoose';
import { validateCreateFavoriteDto } from './middlewares/validate-create-favorite.middleware';

export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  // get all favorites
  async getAllFavorites(req: Request, res: Response) {
    console.log('get all favorites');
    try {
      const favorites = await this.favoritesService.findAll();

      res.status(200).json({
        status: 'success',
        message: 'Favorites fetched successfully',
        data: favorites,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        status: 'error',
        message: (err as Error).message,
      });
    }
  }
  // get favorite
  async getFavorite(req: Request, res: Response) {
    console.log('get favorites...');
    try {
      const favorite = await this.favoritesService.findOneById(req.params.id);

      if (!favorite) {
        res.status(400).json({
          status: 'fail',
          message: 'Favorite not found',
        });
        return;
      }

      res.status(200).json({
        status: 'success',
        message: 'Favorite fetched successfully',
        data: favorite,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        status: 'error',
        message: (err as Error).message,
      });
    }
  }
  // create favorite
  async createFavorite(req: Request, res: Response) {
    console.log('create favorite...');
    try {
      const createFavoriteDto = req.body as IFavorite;
      createFavoriteDto.user = new Types.ObjectId(req.user._id);
      const validationResult = validateCreateFavoriteDto(createFavoriteDto);

      if (validationResult.success === false) {
        const validationErrors = validationResult.error.errors
          .map((err) => err.message)
          .join(', ');

        res.status(400).json({
          status: 'fail',
          message: 'validation faild',
          errors: validationErrors,
        });
        return;
      }

      const favorite = await this.favoritesService.create(createFavoriteDto);

      res.status(201).json({
        status: 'success',
        message: 'Favorite created successfully',
        data: favorite,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        status: 'error',
        message: (err as Error).message,
      });
    }
  }
  // update favorite
  async updateFavorite(req: Request, res: Response) {
    console.log('update favorite...');
    try {
      const updateFavoriteDto = req.body as IFavorite;
      updateFavoriteDto.user = new Types.ObjectId(req.user._id);

      const favorite = await this.favoritesService.update(
        req.params.id,
        updateFavoriteDto
      );

      if (!favorite) {
        res.status(400).json({
          status: 'fail',
          message: 'Favorite not found',
        });
        return;
      }

      res.status(200).json({
        status: 'success',
        message: 'Favorite updated successfully',
        data: favorite,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        status: 'error',
        message: (err as Error).message,
      });
    }
  }
  // delete favorite
  async deleteFavorite(req: Request, res: Response) {
    console.log('delete favorite...');
    try {
      const favorite = await this.favoritesService.delete(req.params.id);

      if (!favorite) {
        res.status(400).json({
          status: 'fail',
          message: 'Favorite not found',
        });
        return;
      }

      res.status(204).json({
        status: 'success',
        message: 'Favorite deleted successfully',
        data: null,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        status: 'error',
        message: (err as Error).message,
      });
    }
  }

  // getFavoriteByUser
  async getFavoriteByUser(req: Request, res: Response) {
    getFavoriteByUserProvider(req, res);
  }
}
