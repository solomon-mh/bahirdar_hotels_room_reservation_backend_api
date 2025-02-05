import express from 'express';
import { ReviewService } from './providers/review.service';
import { ReviewController } from './review.controller';
import { AuthController } from '../auth/auth.controller';
import { UserRole } from '../users/enums/user-role.enum';

const router = express.Router();

const reviewService = new ReviewService();
const reviewController = new ReviewController(reviewService);

const authController = new AuthController();

router.get('/', (req, res) => reviewController.getAllReviews(req, res));
router.get('/:id', (req, res) => reviewController.getReview(req, res));

// protected routes
router.use((req, res, next) => authController.protect(req, res, next));

router.post('/', authController.restrictTo(UserRole.USER), (req, res) =>
  reviewController.createReview(req, res)
);

router.get(
  '/hotel/:hotelId',
  authController.restrictTo(UserRole.ADMIN, UserRole.CASHIER, UserRole.MANAGER),
  (req, res) => reviewController.getAllReviewsOfAHotel(req, res)
);

router.patch(
  '/:id',
  authController.restrictTo(UserRole.USER, UserRole.ADMIN),
  (req, res) => reviewController.updateReview(req, res)
);
router.delete(
  '/:id',
  authController.restrictTo(UserRole.USER, UserRole.ADMIN),
  (req, res) => reviewController.deleteReview(req, res)
);

export const reviewRoutes = router;
