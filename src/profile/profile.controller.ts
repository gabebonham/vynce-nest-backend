import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './create-profile.dto';
import { AuthGuard } from 'src/common/auth.guard';

@Controller('profiles')
@UseGuards(AuthGuard)
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @Post()
  async create(@Body() dto: CreateProfileDto) {
    return this.profileService.create(dto);
  }
}