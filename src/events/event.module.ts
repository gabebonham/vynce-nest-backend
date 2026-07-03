import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventEntity } from 'src/database/entity/event.entity';
import { EventRepository } from 'src/database/repository/event.repository';
import { EventService } from './event.service';
import { EventController } from './event.controller';
@Module({
  controllers: [EventController],
  imports: [TypeOrmModule.forFeature([EventEntity])],
  providers: [EventService, EventRepository],
  exports: [EventService],
})
export class EventModule {}