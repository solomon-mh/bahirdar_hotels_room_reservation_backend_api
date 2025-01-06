import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { StatusCodes } from 'http-status-codes';

export function createApp() {
  const app = express();

  app.use(cors());

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());

  // Serving static files
  app.use(express.static(path.resolve(__dirname, `./../public`)));

  // test route
  app.use('/test', (req, res) => {
    res.status(StatusCodes.OK).json({ message: 'Hello World' });
  });

  return app;
}
