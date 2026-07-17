import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MatchController } from './match.controller';
import { MatchService } from './match.service';
import { LikeEntity } from 'src/database/entity/like.entity';
import { MatchEntity } from 'src/database/entity/match.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LikeEntity, MatchEntity])],
  controllers: [MatchController],
  providers: [MatchService],
  exports: [MatchService],
})
export class MatchModule {}