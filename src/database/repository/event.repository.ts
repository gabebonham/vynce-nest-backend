import { Injectable } from "@nestjs/common";
import { BaseRepository } from "./base.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOptionsRelations, Repository } from "typeorm";
import { EventEntity } from "../entity/event.entity";
import { EventFilterQuery } from "src/events/dto/event-filter.dto";
import { PaginatedResponse } from "src/common/api-response.dto";

@Injectable()
export class EventRepository extends BaseRepository<EventEntity> {
    constructor(
        @InjectRepository(EventEntity)
        repository: Repository<EventEntity>,
    ) {
        super(repository);
    }

    async findByFilterPaginated(
        eventFilter:EventFilterQuery,
        page = 1,
        limit = 10,
        relations: FindOptionsRelations<EventEntity> = {},
    ): Promise<PaginatedResponse> {
        let where:any = {};
        if (eventFilter.category) {
            where.category = eventFilter.category;
        }
        if (eventFilter.title) {
            where.title = eventFilter.title;
        }
        if (eventFilter.minParticipants) {
            where.participants = { $gte: eventFilter.minParticipants };
        }
        if (eventFilter.maxDistanceKm) {
            where.distanceKm = { $lte: eventFilter.maxDistanceKm };
        }
        if (eventFilter.dateRange) {
            const [startDate, endDate] = eventFilter.dateRange.split(',');
            where.date = { $gte: new Date(startDate), $lte: new Date(endDate) };
        }
        const [data, total] = await this.repository.findAndCount({
            where,
            skip: (page - 1) * limit,
            take: limit,
            relations
        });

        const totalPages = Math.ceil(total / limit);

        return new PaginatedResponse(
            data,
            totalPages,
            page,
            limit,
        );
    }
}