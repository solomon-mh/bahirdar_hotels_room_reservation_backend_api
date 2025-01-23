import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { envConfig } from '../config/environment.config';

export function uploadFileLocal(file: Express.Multer.File) {
  const filePath =
    file.destination.split('/').slice(1).join('/') + '/' + file.filename;

  const photoUrl = `${envConfig.BACKEND_URL}/${filePath}`;

  return photoUrl;
}

export function multerUpload({
  dirName,
  isImage,
}: {
  dirName: string;
  isImage: boolean;
}) {
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
    fileFilter: isImage
      ? (req, file, cb) => {
          if (file.mimetype.startsWith('image')) {
            cb(null, true);
          } else {
            cb(null, false);
          }
        }
      : undefined,
    limits: isImage
      ? {
          fileSize: 1024 * 1024 * 3, // 3MB
        }
      : undefined,
  });

  return upload;
}
