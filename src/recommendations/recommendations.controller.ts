import { Request, Response } from 'express';
import { personalRecommendationsProvider } from './providers/personal-recommendations.provider';

export class RecommendationsController {
  // get personalized hotels
  // personalRecommendationsProvider;
  getPersonalizedHotels(req: Request, res: Response) {
    personalRecommendationsProvider(req, res);
  }
}
