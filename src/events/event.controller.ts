import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { EventService } from './event.service';
import { EventFilterQuery } from './event-filter.dto';
import { CreateEventRequest } from './create-event.dto';
import { UserId } from 'src/common/user-id.decorator';
import { AuthGuard } from 'src/common/auth.guard';
import { PaginatedResponse } from 'src/common/api-response.dto';
import { EventResponse } from './event-response.dto';

@Controller('events')
@UseGuards(AuthGuard)
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  async register(@Body() req: CreateEventRequest, @UserId() hostId: string): Promise<EventResponse> {
    return await this.eventService.create(req, hostId);
  }
  @Get()
  async getEvents(@Query() filter: EventFilterQuery): Promise<PaginatedResponse> {
    return await this.eventService.getByFilter(filter);
  }
}
