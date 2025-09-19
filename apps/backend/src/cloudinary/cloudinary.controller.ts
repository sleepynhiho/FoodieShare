import { Controller, Post, Body } from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';

@Controller('cloudinary')
export class CloudinaryController {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  @Post('signature')
  async getSignature(@Body() body: { folder: string }) {
    return this.cloudinaryService.generateSignature(body.folder);
  }
}