import { Request, Response } from 'express';
import { HotelsService } from './providers/hotels.service';
import { IHotel } from './interfaces/hotel.interface';
import { validateCreateHotelDto } from './middlewares/validate-create-hotel-dto.middleware';
import { validateUpdateHotelDto } from './middlewares/validate-update-hotel-dto.middleware';
import { UsersService } from '../users/providers/users.service';
import { HotelImageUploadNames } from './enums/hotel-image-upload-names.enum';
import { uploadFileLocal } from '../lib/utils/file-upload.util';

// Define MulterFiles type
export type MulterFiles = {
  [key in HotelImageUploadNames]?: Express.Multer.File[];
};

export class HotelsController {
  constructor(
    private readonly hotelsService: HotelsService,
    private readonly usersService: UsersService
  ) {}

  // get all hotels
  async getAllHotels(req: Request, res: Response) {
    console.log('get all hotels...');
    try {
      const hotels = await this.hotelsService.findAllHotels();
      res.status(200).json({
        status: 'success',
        results: hotels.length,
        data: {
          hotels,
        },
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        status: 'error',
        message: (err as Error).message,
      });
    }
  }
  // get hotel
  async getHotel(req: Request, res: Response) {
    console.log('get hotel...');
    try {
      const hotel = await this.hotelsService.findHotel(req.params.id);

      if (!hotel) {
        res.status(404).json({
          status: 'fail',
          message: 'hotel not found',
        });
        return;
      }

      res.status(200).json({
        status: 'success',
        data: {
          hotel,
        },
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        status: 'error',
        message: (err as Error).message,
      });
    }
  }
  // create hotel
  async createHotel(req: Request, res: Response) {
    console.log('create hotel...');
    try {
      const createHotelDto = req.body as IHotel;

      const validationResult = validateCreateHotelDto(createHotelDto);

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

      const user = await this.usersService.getUser(
        createHotelDto.manager.toString()
      );

      if (!user) {
        res.status(404).json({
          status: 'fail',
          message: 'manager not found',
        });
        return;
      }

      const files = req.files as MulterFiles;

      if (files?.[HotelImageUploadNames.IMAGE_COVER]) {
        const image = files[HotelImageUploadNames.IMAGE_COVER][0];
        const imageUrl = uploadFileLocal(image);
        createHotelDto.imageCover = imageUrl;
      }

      if (files?.[HotelImageUploadNames.HOTEL_IMAGES]) {
        const images = files[HotelImageUploadNames.HOTEL_IMAGES];
        const imageUrls = images.map((image) => uploadFileLocal(image));
        createHotelDto.hotelImages = imageUrls;
      }

      const hotel = await this.hotelsService.createHotel(createHotelDto);
      res.status(201).json({
        status: 'success',
        data: {
          hotel,
        },
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        status: 'error',
        message: (err as Error).message,
      });
    }
  }
  // update hotel
  async updateHotel(req: Request, res: Response) {
    console.log('update hotel...');
    try {
      const updateHotelDto = req.body as Partial<IHotel>;
      const validationResult = validateUpdateHotelDto(updateHotelDto);

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

      if (updateHotelDto.manager) {
        const user = await this.usersService.getUser(
          updateHotelDto.manager.toString()
        );

        if (!user) {
          res.status(404).json({
            status: 'fail',
            message: 'manager not found',
          });
          return;
        }
      }

      const files = req.files as MulterFiles;

      if (files?.[HotelImageUploadNames.IMAGE_COVER]) {
        const image = files[HotelImageUploadNames.IMAGE_COVER][0];
        const imageUrl = uploadFileLocal(image);
        updateHotelDto.imageCover = imageUrl;
      }

      if (files?.[HotelImageUploadNames.HOTEL_IMAGES]) {
        const images = files[HotelImageUploadNames.HOTEL_IMAGES];
        const imageUrls = images.map((image) => uploadFileLocal(image));
        updateHotelDto.hotelImages = [
          ...(updateHotelDto.hotelImages || []),
          ...imageUrls,
        ];
      }

      const hotel = await this.hotelsService.updateHotel(
        req.params.id,
        updateHotelDto
      );

      if (!hotel) {
        res.status(404).json({
          status: 'fail',
          message: 'hotel not found',
        });
        return;
      }

      res.status(200).json({
        status: 'success',
        data: {
          hotel,
        },
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        status: 'error',
        message: (err as Error).message,
      });
    }
  }

  // delete hotel
  async deleteHotel(req: Request, res: Response) {
    console.log('delete hotel...');
    try {
      const hotel = await this.hotelsService.deleteHotel(req.params.id);

      if (!hotel) {
        res.status(404).json({
          status: 'fail',
          message: 'hotel not found',
        });
        return;
      }

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
