import { Schema } from 'mongoose';
import { AddressInterface } from './address.interface';

export const AddressSchema: Schema<AddressInterface> =
  new Schema<AddressInterface>(
    {
      country: {
        type: String,
        trim: true,
        required: [true, 'An address must have a country'],
        minlength: [
          3,
          'A country name must have more or equal then 3 characters',
        ],
      },
      city: {
        type: String,
        trim: true,
        required: [true, 'An address must have a city'],
        minlength: [3, 'A city name must have more or equal then 3 characters'],
      },
      subcity: {
        type: String,
        trim: true,
        required: [true, 'An address must have a subcity'],
        minlength: [
          3,
          'A subcity name must have more or equal then 3 characters',
        ],
      },
      woreda: {
        type: String,
        trim: true,
        required: [true, 'An address must have a woreda'],
        minlength: [
          3,
          'A woreda name must have more or equal then 3 characters',
        ],
      },
      street: {
        type: String,
        trim: true,
        required: [true, 'An address must have a street'],
        minlength: [
          3,
          'A street name must have more or equal then 3 characters',
        ],
      },
    },
    { _id: false }
  );
