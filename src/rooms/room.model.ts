import mongoose, { Model, Schema } from 'mongoose';
import { IRoom } from './interface/room.interface';
import { RoomType } from './enums/room-type.enum';
import HotelModel from '../hotels/hotels.model';

interface IRoomMethods {}

export interface IRoomModel extends Model<IRoom, {}, IRoomMethods> {
  calcMinPriceAndNumOfRooms(hotelId: mongoose.Types.ObjectId): Promise<void>;
}

const RoomSchema = new Schema<IRoom, IRoomModel>(
  {
    hotel: {
      type: Schema.Types.ObjectId,
      ref: 'Hotel',
      required: true,
    },
    roomNumber: {
      type: String,
      required: true,
    },
    roomType: {
      type: String,
      required: true,
      enum: RoomType,
    },
    roomFacilities: {
      type: [String],
      required: true,
    },
    capacity: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    pricePerNight: {
      type: Number,
      required: true,
    },
    images: {
      type: [String],
      required: [true, 'A room must have images'],
    },
  },
  {
    timestamps: true,
  }
);

// this will prevent creating the same roomNumber on the same hotel
RoomSchema.index({ hotel: 1, roomNumber: 1 }, { unique: true });

// calcMinPriceAndNumOfRooms
RoomSchema.static(
  'calcMinPriceAndNumOfRooms',
  async function (hotelId: mongoose.Types.ObjectId) {
    const stats = await this.aggregate([
      { $match: { hotel: hotelId } },
      // TODO: fix calculation of num of rooms on a hotel
      {
        $group: {
          _id: '$hotel',
          numOfRooms: { $sum: 1 },
          minPrice: { $min: '$pricePerNight' },
        },
      },
    ]);

    if (stats.length > 0) {
      await HotelModel.findByIdAndUpdate(hotelId, {
        numOfRooms: stats[0].numOfRooms,
        minPricePerNight: stats[0].minPrice,
      });
    } else {
      await HotelModel.findByIdAndUpdate(hotelId, {
        numOfRooms: 0,
        minPricePerNight: 0,
      });
    }
  }
);

RoomSchema.post('save', function () {
  const Room = this.constructor as IRoomModel;
  Room.calcMinPriceAndNumOfRooms(this.hotel);
});

const RoomModel = mongoose.model<IRoom, IRoomModel>('Room', RoomSchema);

// check the creation of the index
RoomModel.on('index', function (error) {
  if (error) {
    console.error('Index creation failed on room model:', error);
  }
});

export default RoomModel;
