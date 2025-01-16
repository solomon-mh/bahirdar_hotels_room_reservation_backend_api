import express from 'express';
import { RoomsService } from './providers/room.service';
import { RoomsController } from './room.controller';

const router = express.Router();

const roomsService = new RoomsService();
const roomsController = new RoomsController(roomsService);

router.get('/', (req, res) => roomsController.getAllRooms(req, res));
router.get('/:id', (req, res) => roomsController.getRoom(req, res));
router.post('/', (req, res) => roomsController.createRoom(req, res));
router.put('/:id', (req, res) => roomsController.updateRoom(req, res));
router.delete('/:id', (req, res) => roomsController.deleteRoom(req, res));

export const roomRoutes = router;
