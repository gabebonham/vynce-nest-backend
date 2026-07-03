import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { EventRepository } from 'src/database/repository/event.repository';
import { EventFilterQuery } from './event-filter.dto';
import { PaginatedResponse } from 'src/common/api-response.dto';
import { EventEntity } from 'src/database/entity/event.entity';
import { CreateEventRequest } from './create-event.dto';

@Injectable()
export class EventService {
    constructor(private readonly eventRepository: EventRepository) { }
    async getByFilter(eventFilter:EventFilterQuery): Promise<PaginatedResponse> {
        if (!eventFilter) {
            throw new BadRequestException('Event filter is required.');
        }
        if (eventFilter.id) {
            const event = await this.eventRepository.findById(eventFilter.id);
            if (!event) {
                throw new NotFoundException('Event not found.');
            }
            return new PaginatedResponse([event], 1, 1, 1);
        }
        return await this.eventRepository.findByFilterPaginated(eventFilter);
    }
    async create(eventData: CreateEventRequest, hostId: string): Promise<EventEntity> {
        if (eventData.date < new Date()) {
            throw new BadRequestException('Event date cannot be in the past.');
        }
        if (eventData.participantsCount < 0 || eventData.maxParticipants < 0) {
            throw new BadRequestException('Participants count and max participants must be positive numbers.');
        }
        if (eventData.participantsCount > eventData.maxParticipants) {
            throw new BadRequestException('Participants count cannot exceed max participants.');
        }
        const event = this.eventRepository.create({...eventData, hostId});
        return event;
    }
}