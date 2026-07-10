import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { ProfileEntity } from 'src/database/entity/profile.entity';
import { ProfileRepository } from 'src/database/repository/profile.repository';
import { CreateProfileDto } from './create-profile.dto';
import { ProfileModel } from './profile.model';
import { ProfileResponseDto } from './profile-response.dto';

@Injectable()
export class ProfileService {
  constructor(private readonly profileRepository: ProfileRepository) {}
  async create(dto: CreateProfileDto): Promise<ProfileEntity> {

    return await this.profileRepository.create({user:{id: dto.userId}});
  }
  async update(id: string, data: Partial<ProfileEntity>): Promise<ProfileResponseDto> {
    const profile = await this.profileRepository.findById(id);
    if (!profile) {
      throw new NotFoundException('Profile not found.');
    }
    const newProfile = await this.profileRepository.update(id, data);
    return new ProfileModel(newProfile).mapToResponseDto();
  }
  async getById(id: string): Promise<ProfileResponseDto> {
    const profile = await this.profileRepository.findById(id);
    if (!profile) {
      throw new NotFoundException('Profile not found.');
    }
    return new ProfileModel(profile).mapToResponseDto();
  }
}