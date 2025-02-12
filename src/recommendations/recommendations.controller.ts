import { Request, Response } from 'express';
import { personalRecommendationsProvider } from './providers/personal-recommendations.provider';
import { popularHotelsProvider } from './providers/popular-hotels.provider';

export class RecommendationsController {
  // get personalized hotels
  // personalRecommendationsProvider;
  getPersonalizedHotels(req: Request, res: Response) {
    personalRecommendationsProvider(req, res);
  }

  // get popular hotels
  // popularHotelsProvider
  getPopularHotels(req: Request, res: Response) {
    popularHotelsProvider(req, res);
  }
}
