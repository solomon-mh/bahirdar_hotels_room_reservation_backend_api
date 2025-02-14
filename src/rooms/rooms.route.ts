import express from 'express';
import { RoomsService } from './providers/room.service';
import { RoomsController } from './room.controller';
import { AuthController } from '../auth/auth.controller';
import { UserRole } from '../users/enums/user-role.enum';
import { multerUpload } from '../lib/utils/file-upload.util';

const router = express.Router();

const roomsService = new RoomsService();
const roomsController = new RoomsController(roomsService);
const authController = new AuthController();

const upload = multerUpload({ dirName: 'rooms', isImage: true });

router.get('/', (req, res) => roomsController.getAllRooms(req, res));
router.get('/:id', (req, res) => roomsController.getRoom(req, res));

// protected routes
router.use((req, res, next) => authController.protect(req, res, next));

router.post(
  '/',
  authController.restrictTo(UserRole.ADMIN, UserRole.MANAGER),
  upload.array('images', 5),
  (req, res) => roomsController.createRoom(req, res)
);

router.patch(
  '/:id',
  authController.restrictTo(UserRole.ADMIN, UserRole.MANAGER, UserRole.CASHIER),
  upload.array('images', 5),
  (req, res) => roomsController.updateRoom(req, res)
);
router.delete(
  '/:id',
  authController.restrictTo(UserRole.ADMIN, UserRole.MANAGER),
  (req, res) => roomsController.deleteRoom(req, res)
);

export const roomRoutes = router;
