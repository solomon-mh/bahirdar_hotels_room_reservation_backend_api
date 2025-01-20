import { AuthController } from './auth.controller';
import { Router } from 'express';

const router = Router();

const authController = new AuthController();

router.post('/login', (req, res) => authController.login(req, res));
router.post('/signup', (req, res) => authController.signup(req, res));
router.post('/logout', (req, res) => authController.logout(req, res));
router.post('/forgot-password', (req, res) =>
  authController.forgotPassword(req, res)
);
router.post('/reset-password/:resetToken', (req, res) =>
  authController.resetPassword(req, res)
);

// protected routes
router.use((req, res, next) => authController.protect(req, res, next));

router.post('/update-my-password', (req, res) =>
  authController.updateMyPassword(req, res)
);

export const authRoutes = router;
