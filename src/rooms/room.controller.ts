import { Request, Response } from 'express';
import { RoomsService } from './providers/room.service';
import { IRoom } from './interface/room.interface';
import { validateCreateRoomDto } from './middlewares/validate-create-room-dto.middleware';
import { validateUpdateRoomDto } from './middlewares/validate-update-room-dto.middleware';
import { uploadFileLocal } from '../lib/utils/file-upload.util';
import { IRoomModel } from './room.model';

export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  // get all rooms
  async getAllRooms(req: Request, res: Response) {
    console.log('get all rooms...');
    try {
      const rooms = await this.roomsService.findAllRooms();

      res.status(200).json({
        status: 'success',
        data: rooms,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        status: 'error',
        message: (err as Error).message,
      });
    }
  }
  // get room
  async getRoom(req: Request, res: Response) {
    console.log('get room...');
    try {
      const room = await this.roomsService.findRoom(req.params.id);

      if (!room) {
        res.status(404).json({
          status: 'fail',
          message: 'Room not found',
        });
        return;
      }

      res.status(200).json({
        status: 'success',
        data: room,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        status: 'error',
        message: (err as Error).message,
      });
    }
  }
  // create room
  async createRoom(req: Request, res: Response) {
    console.log('create room...');
    try {
      const createRoomDto = req.body as IRoom;
      const validationResult = validateCreateRoomDto(createRoomDto);

      if (validationResult.success === false) {
        const validationErrors = validationResult.error.errors.map(
          (error) => error.message
        );
        res.status(400).json({
          status: 'fail',
          message: 'Validation failed',
          errors: validationErrors,
        });
        return;
      }

      const files = req.files as Express.Multer.File[];

      if (files?.length) {
        const images = files.map((file) => uploadFileLocal(file));
        createRoomDto.images = images;
      }

      // validate images
      if (!createRoomDto.images || createRoomDto.images.length === 0) {
        res.status(400).json({
          status: 'fail',
          message: 'room images are required',
        });
        return;
      }

      const room = await this.roomsService.createRoom(createRoomDto);

      res.status(201).json({
        status: 'success',
        data: room,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        status: 'error',
        message: (err as Error).message,
      });
    }
  }
  // update room
  async updateRoom(req: Request, res: Response) {
    console.log('update room...');
    try {
      const updateRoomDto = req.body as Partial<IRoom>;

      const validationResult = validateUpdateRoomDto(updateRoomDto);

      if (validationResult.success === false) {
        const validationErrors = validationResult.error.errors.map(
          (error) => error.message
        );
        res.status(400).json({
          status: 'fail',
          message: 'Validation failed',
          errors: validationErrors,
        });
        return;
      }

      const files = req.files as Express.Multer.File[];

      if (files?.length) {
        const images = files.map((file) => uploadFileLocal(file));
        updateRoomDto.images = [...(updateRoomDto.images || []), ...images];
      }

      const room = await this.roomsService.updateRoom(
        req.params.id,
        updateRoomDto
      );

      if (!room) {
        res.status(404).json({
          status: 'fail',
          message: 'Room not found',
        });
        return;
      }

      // update hotel | price per night and number of rooms
      const Room = room.constructor as IRoomModel;
      await Room.calcMinPriceAndNumOfRooms(room.hotel);

      res.status(200).json({
        status: 'success',
        data: room,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        status: 'error',
        message: (err as Error).message,
      });
    }
  }
  // delete room
  async deleteRoom(req: Request, res: Response) {
    console.log('delete room...');
    try {
      const room = await this.roomsService.deleteRoom(req.params.id);

      if (!room) {
        res.status(404).json({
          status: 'fail',
          message: 'Room not found',
        });
        return;
      }

      // update hotel | price per night and number of rooms
      const Room = room.constructor as IRoomModel;
      await Room.calcMinPriceAndNumOfRooms(room.hotel);

      res.status(204).json({
        status: 'success',
        data: null,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        status: 'error',
        message: (err as Error).message,
      });
    }
  }
}
