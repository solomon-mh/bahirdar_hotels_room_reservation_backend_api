import express from 'express';
import { ReviewService } from './providers/review.service';
import { ReviewController } from './review.controller';
import { AuthController } from '../auth/auth.controller';

const router = express.Router();

const reviewService = new ReviewService();
const reviewController = new ReviewController(reviewService);

const authController = new AuthController();

router.get('/', (req, res) => reviewController.getAllReviews(req, res));
router.get('/:id', (req, res) => reviewController.getReview(req, res));

// protected routes
router.use((req, res, next) => authController.protect(req, res, next));

router.post('/', (req, res) => reviewController.createReview(req, res));
router.patch('/:id', (req, res) => reviewController.updateReview(req, res));
router.delete('/:id', (req, res) => reviewController.deleteReview(req, res));

export const reviewRoutes = router;
