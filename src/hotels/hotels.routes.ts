import express from 'express';
import { HotelsService } from './providers/hotels.service';
import { HotelsController } from './hotels.controller';
import { UsersService } from '../users/providers/users.service';

const router = express.Router();

const hotelsService = new HotelsService();
const usersService = new UsersService();
const hotelsController = new HotelsController(hotelsService, usersService);

router.get('/', (req, res) => hotelsController.getAllHotels(req, res));
router.get('/:id', (req, res) => hotelsController.getHotel(req, res));
router.post('/', (req, res) => hotelsController.createHotel(req, res));
router.patch('/:id', (req, res) => hotelsController.updateHotel(req, res));
router.delete('/:id', (req, res) => hotelsController.deleteHotel(req, res));

export const hotelRoutes = router;
