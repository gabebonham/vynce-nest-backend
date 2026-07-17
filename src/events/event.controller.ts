import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { EventService } from './event.service';
import { EventFilterQuery } from './dto/event-filter.dto';
import { CreateEventRequest } from './dto/create-event.dto';
import { UserId } from 'src/common/user-id.decorator';
import { AuthGuard } from 'src/common/auth.guard';
import { PaginatedResponse } from 'src/common/api-response.dto';
import { EventResponse } from './dto/event-response.dto';
import { EventEntity } from 'src/database/entity/event.entity';
import { UpdateEventRequest } from './dto/update-event.dto';

@Controller('events')
@UseGuards(AuthGuard)
export class EventController {
  constructor(private readonly eventService: EventService) { }

  @Post()
  async register(@Body() req: CreateEventRequest, @UserId() hostId: string): Promise<EventResponse> {
    return await this.eventService.create(req, hostId);
  }
  @Get()
  async getEvents(@Query() filter: EventFilterQuery, @Query('page') page: number, @Query('limit') limit: number): Promise<PaginatedResponse> {
    return await this.eventService.getByFilter(filter, page, limit);
  }
  @Get(':id')
  async getById(@Param('id') id: string): Promise<EventEntity> {
    return await this.eventService.getById(id);
  }
  @Patch(':id')
  async update(@Param('id') id: string, @Body() body: UpdateEventRequest): Promise<EventEntity> {
    return await this.eventService.update(id, body);
  }
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<EventEntity> {
    return await this.eventService.delete(id);
  }
}
