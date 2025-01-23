import express from 'express';
import { FavoritesService } from './providers/favorites.service';
import { FavoritesController } from './favorites.controller';
import { AuthController } from '../auth/auth.controller';

const router = express.Router();

const favoritesService = new FavoritesService();
const favoritesController = new FavoritesController(favoritesService);

const authController = new AuthController();

router.use((req, res, next) => authController.protect(req, res, next));

router.get('/user', (req, res) =>
  favoritesController.getFavoriteByUser(req, res)
);

router.get('/', (req, res) => favoritesController.getAllFavorites(req, res));
router.get('/:id', (req, res) => favoritesController.getFavorite(req, res));
router.post('/', (req, res) => favoritesController.createFavorite(req, res));
router.patch('/:id', (req, res) =>
  favoritesController.updateFavorite(req, res)
);
router.delete('/:id', (req, res) =>
  favoritesController.deleteFavorite(req, res)
);

export const favoritesRoutes = router;
