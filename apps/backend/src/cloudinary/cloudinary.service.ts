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
}