import { Readable } from 'stream';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import cloudinary from '../config/cloudinary.config';

export async function uploadFile(file: Express.Multer.File): Promise<string> {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: 'student_profiles' },
      (error, result) => {
        if (error) return reject(error);
        if (result) {
          resolve(result.secure_url);
        } else {
          reject(new Error('Upload failed, result is undefined'));
        }
      }
    );

    const readableStream = new Readable({
      read() {
        this.push(file.buffer);
        this.push(null);
      },
    });

    readableStream.pipe(uploadStream);
  });
}

export function uploadFileLocal(file: Express.Multer.File) {
  const filePath =
    file.destination.split('/').slice(1).join('/') + '/' + file.filename;

  const photoUrl = `${process.env.BACKEND_URL as string}/${filePath}`;

  return photoUrl;
}

export function multerUpload({ dirName }: { dirName: string }) {
  const uploadDirRelative = `public/uploads/${dirName}`;
  const uploadsDirRoot = path.resolve(
    __dirname,
    `../../../${uploadDirRelative}`
  );

  // Step 5: Ensure the uploads directory exists
  if (!fs.existsSync(uploadsDirRoot)) {
    fs.mkdirSync(uploadsDirRoot, { recursive: true });
  }

  const upload = multer({
    storage: multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, uploadDirRelative);
      },
      filename: (req, file, cb) => {
        const ext = file.mimetype.split('/')[1];
        cb(
          null,
          `${dirName}-${Date.now()}-${
            Math.random().toString().split('.')[1]
          }.${ext}`
        );
      },
    }),
    fileFilter: (req, file, cb) => {
      if (file.mimetype.startsWith('image')) {
        cb(null, true);
      } else {
        cb(null, false);
      }
    },
    limits: {
      fileSize: 1024 * 1024 * 3, // 3MB
    },
  });

  return upload;
}
