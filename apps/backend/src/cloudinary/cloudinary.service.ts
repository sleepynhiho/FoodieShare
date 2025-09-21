import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary } from 'cloudinary';
import * as crypto from 'crypto';

@Injectable()
export class CloudinaryService {
  constructor(private configService: ConfigService) {
    cloudinary.config({
      cloud_name: this.configService.get('CLOUDINARY_CLOUD_NAME'),
      api_key: this.configService.get('CLOUDINARY_API_KEY'),
      api_secret: this.configService.get('CLOUDINARY_API_SECRET'),
    });
  }

  generateSignature(folder: string) {
    const timestamp = Math.round(new Date().getTime() / 1000);
    const api_key = this.configService.get('CLOUDINARY_API_KEY');
    const api_secret = this.configService.get('CLOUDINARY_API_SECRET');

    // Parameters to include in signature
    const params = {
      folder,
      timestamp,
    };

    // Create the string to sign
    const sortedParams = Object.keys(params)
      .sort()
      .map(key => `${key}=${params[key]}`)
      .join('&');

    const stringToSign = `${sortedParams}${api_secret}`;
    
    // Generate signature
    const signature = crypto
      .createHash('sha1')
      .update(stringToSign)
      .digest('hex');

    return {
      signature,
      timestamp,
      api_key,
      folder,
    };
  }

  async uploadFile(file: Express.Multer.File, folder: string = 'avatars'): Promise<string> {
    return new Promise((resolve, reject) => {
      const uploadOptions = {
        folder,
        transformation: [
          { width: 400, height: 400, crop: 'fill', gravity: 'face' },
          { quality: 'auto:good' },
          { format: 'webp' }
        ],
        public_id: `${folder}/${Date.now()}_${Math.random().toString(36).substring(7)}`,
      };

      const uploadStream = cloudinary.uploader.upload_stream(
        uploadOptions,
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result?.secure_url || '');
          }
        }
      );

      uploadStream.end(file.buffer);
    });
  }

  async deleteFile(publicId: string): Promise<void> {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.destroy(publicId, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  }
}