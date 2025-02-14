import express from 'express';
import { HotelsService } from './providers/hotels.service';
import { HotelsController } from './hotels.controller';
import { UsersService } from '../users/providers/users.service';
import { AuthController } from '../auth/auth.controller';
import { UserRole } from '../users/enums/user-role.enum';
import { multerUpload } from '../lib/utils/file-upload.util';
import { HotelImageUploadNames } from './enums/hotel-image-upload-names.enum';

const router = express.Router();

const hotelsService = new HotelsService();
const usersService = new UsersService();
const hotelsController = new HotelsController(hotelsService, usersService);
const authController = new AuthController();

const upload = multerUpload({ dirName: 'hotels', isImage: true });

router.get('/', (req, res) => hotelsController.getAllHotels(req, res));
router.get('/with-rooms/:id', (req, res) =>
  hotelsController.getHotelWithRooms(req, res)
);
// get all cashiers
router.get(
  '/:hotelId/all-cashiers',
  (req, res, next) => authController.protect(req, res, next),
  (req, res) => hotelsController.getAllHotelCashiers(req, res)
);

router.get('/:id', (req, res) => hotelsController.getHotel(req, res));

// protected routes
router.use((req, res, next) => authController.protect(req, res, next));

// create cashier
router.patch(
  '/:hotelId/create-cashiers/:userId',
  authController.restrictTo(UserRole.ADMIN, UserRole.MANAGER),
  (req, res) => hotelsController.createCashier(req, res)
);
// delete cashier
router.patch(
  '/:hotelId/delete-cashiers/:userId',
  authController.restrictTo(UserRole.ADMIN, UserRole.MANAGER),
  (req, res) => hotelsController.deleteCashier(req, res)
);

router.post(
  '/',
  authController.restrictTo(UserRole.ADMIN),
  upload.fields([
    { name: HotelImageUploadNames.IMAGE_COVER, maxCount: 1 },
    { name: HotelImageUploadNames.HOTEL_IMAGES, maxCount: 10 },
  ]),
  (req, res) => hotelsController.createHotel(req, res)
);

router.patch(
  '/:id',
  authController.restrictTo(UserRole.ADMIN, UserRole.MANAGER),
  upload.fields([
    { name: HotelImageUploadNames.IMAGE_COVER, maxCount: 1 },
    { name: HotelImageUploadNames.HOTEL_IMAGES, maxCount: 10 },
  ]),
  (req, res) => hotelsController.updateHotel(req, res)
);
router.delete('/:id', authController.restrictTo(UserRole.ADMIN), (req, res) =>
  hotelsController.deleteHotel(req, res)
);

export const hotelRoutes = router;
