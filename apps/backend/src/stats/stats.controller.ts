import { Controller, Get, Query } from '@nestjs/common';
import { StatsService } from './stats.service';

@Controller('stats')
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @Get('app')
  async getAppStats() {
    return this.statsService.getAppStats();
  }

  @Get('categories')
  async getCategoryStats() {
    return this.statsService.getCategoryStats();
  }

  @Get('top-authors')
  async getTopAuthors(@Query('limit') limit?: string) {
    const limitNum = limit ? parseInt(limit, 10) : 10;
    return this.statsService.getTopAuthors(limitNum);
  }
}