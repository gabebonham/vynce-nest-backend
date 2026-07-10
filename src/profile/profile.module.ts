import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileEntity } from 'src/database/entity/profile.entity';
import { ProfileRepository } from 'src/database/repository/profile.repository';
import { ProfileController } from './profile.controller';
@Module({
  controllers: [ProfileController],
  imports: [TypeOrmModule.forFeature([ProfileEntity])],
  providers: [ProfileService, ProfileRepository],
  exports: [ProfileService],
})
export class ProfileModule {}