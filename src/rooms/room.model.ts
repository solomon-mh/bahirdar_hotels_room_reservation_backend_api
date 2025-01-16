import mongoose, { Document, Model, Schema } from 'mongoose';
import { IRoom } from './interface/room.interface';
import { RoomType } from './enums/room-type.enum';

interface IRoomModel extends Model<IRoom, Document> {}

const RoomSchema: Schema<IRoom> = new Schema<IRoom>(
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
  },
  {
    timestamps: true,
  }
);

const RoomModel: Model<IRoomModel> = mongoose.model<IRoomModel>(
  'Room',
  RoomSchema
);

export default RoomModel;
