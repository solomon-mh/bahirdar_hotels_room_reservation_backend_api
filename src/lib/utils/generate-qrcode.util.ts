import QRCode from 'qrcode';
import fs from 'fs';
import path from 'path';
import { uploadFile } from './file-upload.util';
import { envConfig } from '../config/environment.config';

export async function generateAndUploadQRCode(data: string): Promise<string> {
  try {
    // Step 1: Generate the QR code as a data URL
    const qrCodeData = await QRCode.toDataURL(data);

    // Step 2: Extract the Base64 portion
    const base64Image = qrCodeData.replace(/^data:image\/png;base64,/, '');

    // Step 3: Convert Base64 to a Buffer
    const buffer = Buffer.from(base64Image, 'base64');

    // Step 4: Create a mock file-like object for uploadFile
    const mockFile = {
      buffer,
      originalname: 'qrcode.png', // Add a meaningful name if required
      mimetype: 'image/png', // Ensure correct MIME type
    } as Express.Multer.File;

    // Step 5: Upload the file to Cloudinary
    const url = await uploadFile(mockFile);

    console.log('QR Code uploaded successfully:', url);
    return url;
  } catch (error) {
    console.error('Error generating or uploading QR code:', error);
    throw error;
  }
}

export async function generateAndUploadQRCodeLocal(
  data: string
): Promise<string> {
  try {
    // Step 1: Generate the QR code as a data URL
    const qrCodeData = await QRCode.toDataURL(data);

    // Step 2: Extract the Base64 portion
    const base64Image = qrCodeData.replace(/^data:image\/png;base64,/, '');

    // Step 3: Convert Base64 to a Buffer
    const buffer = Buffer.from(base64Image, 'base64');

    // Step 4: Define file path and name
    const uploadsDir = path.resolve(
      __dirname,
      '../../../public/uploads/certifications'
    );
    const fileName = `qrcode-${Date.now()}-${
      Math.random().toString().split('.')[1]
    }.png`;
    const filePath = path.join(uploadsDir, fileName);

    // Step 5: Ensure the uploads directory exists
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    // Step 6: Write the QR code to the file system
    fs.writeFileSync(filePath, buffer);

    // Step 7: Construct the URL for the uploaded file
    const photoUrl = `${envConfig.BACKEND_URL}/uploads/certifications/${fileName}`;

    console.log('QR Code uploaded successfully:', photoUrl);
    return photoUrl;
  } catch (error) {
    console.error('Error generating or uploading QR code:', error);
    throw error;
  }
}
