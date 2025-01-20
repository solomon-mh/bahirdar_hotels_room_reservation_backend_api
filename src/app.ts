import express, { Request, Response } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { StatusCodes } from 'http-status-codes';
import { userRoutes } from './users/users.routes';
import { hotelRoutes } from './hotels/hotels.routes';
import { roomRoutes } from './rooms/room.routes';
import { bookingRoutes } from './bookings/bookings.routes';

export function createApp() {
  const app = express();

  app.use(
    cors({
      origin: true,
      credentials: true,
    })
  );

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());

  // Serving static files
  app.use(express.static(path.resolve(__dirname, `./../public`)));

  // test route
  app.use('/test', (req, res) => {
    res.status(StatusCodes.OK).json({ message: 'Hello World' });
  });

  // all routes
  app.use('/api/v1/users', userRoutes);
  app.use('/api/v1/hotels', hotelRoutes);
  app.use('/api/v1/rooms', roomRoutes);
  app.use('/api/v1/bookings', bookingRoutes);

  // not found route
  app.all('*', (req: Request, res: Response) => {
    res.status(404).json({
      status: 'fail',
      message: `Can't find ${req.originalUrl} on this server!`,
    });
  });

  return app;
}
