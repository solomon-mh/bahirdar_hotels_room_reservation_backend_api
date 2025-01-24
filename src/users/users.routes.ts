import express from 'express';
import { UsersService } from './providers/users.service';
import { UsersController } from './user.controller';
import { AuthController } from '../auth/auth.controller';
import { UserRole } from './enums/user-role.enum';
import { multerUpload } from '../lib/utils/file-upload.util';

const router = express.Router();

const usersService = new UsersService();
const usersController = new UsersController(usersService);

const authController = new AuthController();

const upload = multerUpload({ dirName: 'users', isImage: true });

// protect routes
router.use((req, res, next) => authController.protect(req, res, next));

router.get('/current-user', (req, res) =>
  usersController.getCurrentUser(req, res)
);

router.get('/user-with-bookings', (req, res) =>
  usersController.getUserWithBookings(req, res)
);

router.post('/complete-onboarding', upload.single('image'), (req, res) =>
  usersController.completeOnboarding(req, res)
);

router.get('/manager-with-detail', (req, res) =>
  usersController.getManagerWithDetails(req, res)
);

// restrict routes
router.use(authController.restrictTo(UserRole.ADMIN));

router.get('/', (req, res) => usersController.getAllUsers(req, res));
router.get('/:id', (req, res) => usersController.getUser(req, res));
router.post('/', (req, res) => usersController.createUser(req, res));
router.patch('/:id', upload.single('image'), (req, res) =>
  usersController.updateUser(req, res)
);
router.delete('/:id', (req, res) => usersController.deleteUser(req, res));

export const userRoutes = router;
