import { Injectable } from "@nestjs/common";
import { BaseRepository } from "./base.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ChatEntity } from "../entity/chat.entity";
import { MessageEntity } from "../entity/message.entity";
import { PaginatedResponse } from "src/common/api-response.dto";

@Injectable()
export class MessageRepository extends BaseRepository<MessageEntity> {
    constructor(
        @InjectRepository(MessageEntity)
        repository: Repository<MessageEntity>,
    ) {
        super(repository);
    }

    async findByChatIdPaginated(chatId: string, page = 1, limit = 10): Promise<PaginatedResponse> {
        const [data, total] = await this.repository.findAndCount({
            where: { chat: { id: chatId } },
            relations: { readStatus: true },
            order: { createdAt: 'DESC' },
            skip: (page - 1) * limit,
            take: limit,
        });

        const totalPages = Math.ceil(total / limit);
        return new PaginatedResponse(data, totalPages, page, limit);
    }
    
    async countChatMessages(chatId: string): Promise<number> {
        return this.repository.count({
            where: { chat: { id: chatId } },
        });
    }
}