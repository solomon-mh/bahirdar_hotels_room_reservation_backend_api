import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { envConfig } from './lib/config/environment.config';

dotenv.config();

const MONGODB_URI = envConfig.MONGO_URI;

export async function connectToMongoDB() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Database Connection Successful...', MONGODB_URI);
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1);
  }
}
