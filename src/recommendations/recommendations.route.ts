import express from 'express';
import { RecommendationsController } from './recommendations.controller';
import { AuthController } from '../auth/auth.controller';

const recommendationsController = new RecommendationsController();
const authController = new AuthController();

const router = express.Router();

router.get('/popular-hotels', (req, res) =>
  recommendationsController.getPopularHotels(req, res)
);

router.get(
  '/personal-recommendations',
  (req, res, next) => authController.protect(req, res, next),
  (req, res) => recommendationsController.getPersonalizedHotels(req, res)
);

export const recommendationRoutes = router;
