import { Controller, Get, Query } from '@nestjs/common';
import { GoogleLocationService } from './google-location.provider';

@Controller('locations')
export class LocationController {
  constructor(private locationService: GoogleLocationService) {}

  @Get('search')
  async search(@Query('q') query: string) {
    return this.locationService.search(query);
  }
}