import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { EventRepository } from 'src/database/repository/event.repository';
import { EventFilterQuery } from './dto/event-filter.dto';
import { PaginatedResponse } from 'src/common/api-response.dto';
import { EventEntity } from 'src/database/entity/event.entity';
import { CreateEventRequest } from './dto/create-event.dto';
import { UpdateEvent } from 'typeorm';
import { UpdateEventRequest } from './dto/update-event.dto';

@Injectable()
export class EventService {
    constructor(private readonly eventRepository: EventRepository) { }
    async getByFilter(eventFilter: EventFilterQuery, page:number, limit:number): Promise<PaginatedResponse> {
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
        return await this.eventRepository.findByFilterPaginated(eventFilter, page, limit, {host:true});
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
        const event = this.eventRepository.create({ ...eventData, hostId });
        return event;
    }
    async getById(id: string): Promise<EventEntity> {
        const event = await this.eventRepository.findById(id, {host:true})
        if (!event) {
            throw new BadRequestException('Event not fount')
        }
        return event
    }
    async update(id: string, dto: UpdateEventRequest): Promise<EventEntity> {
        const event = await this.eventRepository.findById(id)
        if (!event) {
            throw new BadRequestException('Event not fount')
        }
        const updatedEvent = await this.eventRepository.update(id, dto)
        return updatedEvent
    }
    async delete(id: string): Promise<EventEntity> {
        const event = await this.eventRepository.findById(id)
        if (!event) {
            throw new BadRequestException('Event not fount')
        }
        await this.eventRepository.delete(id)
        return event
    }
}