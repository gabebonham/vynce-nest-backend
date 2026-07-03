import { Module } from '@nestjs/common';
import { GoogleLocationService } from './google-location.provider';
import { LocationController } from './location.controller';
@Module({
    controllers: [LocationController],
  providers: [GoogleLocationService],
  exports: [GoogleLocationService],
})
export class LocationModule {}