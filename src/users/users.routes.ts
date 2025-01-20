import express from 'express';
import { UsersService } from './providers/users.service';
import { UsersController } from './user.controller';
import { AuthController } from '../auth/auth.controller';
import { UserRole } from './enums/user-role.enum';

const router = express.Router();

const usersService = new UsersService();
const usersController = new UsersController(usersService);

const authController = new AuthController();

// protect routes
router.use((req, res, next) => authController.protect(req, res, next));

router.get('/current-user', (req, res) =>
  usersController.getCurrentUser(req, res)
);

// restrict routes
router.use(authController.restrictTo(UserRole.ADMIN));

router.get('/', (req, res) => usersController.getAllUsers(req, res));
router.get('/:id', (req, res) => usersController.getUser(req, res));
router.post('/', (req, res) => usersController.createUser(req, res));
router.patch('/:id', (req, res) => usersController.updateUser(req, res));
router.delete('/:id', (req, res) => usersController.deleteUser(req, res));

export const userRoutes = router;
