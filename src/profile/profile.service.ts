import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { ProfileEntity } from 'src/database/entity/profile.entity';
import { ProfileRepository } from 'src/database/repository/profile.repository';
import { CreateProfileDto } from './create-profile.dto';

@Injectable()
export class ProfileService {
  constructor(private readonly profileRepository: ProfileRepository) {}
  async create(dto: CreateProfileDto): Promise<ProfileEntity> {

    return await this.profileRepository.create({user:{id: dto.userId}});
  }

}