import { Inject, Injectable } from '@nestjs/common';
import { CreateMessageRequest } from './create-message.dto';
import { CreateChatRequest } from './create-chat.dto';
import { MessageRepository } from 'src/database/repository/message.repository';
import { ChatRepository } from 'src/database/repository/chat.repository';
import Redis from 'ioredis';
import { REDIS_CLIENT } from 'src/providers/redis.provider';

@Injectable()
export class ChatService {
    constructor(
        private readonly chatRepository: ChatRepository,
        private readonly messageRepository: MessageRepository,
        @Inject(REDIS_CLIENT) private readonly redis: Redis,
    ) { }
    async createChat(dto: CreateChatRequest) {
        const newChat = {
            ...dto,
            eventId: dto.eventId,
        }
        return await this.chatRepository.create(newChat);
    }
    async saveMessage(dto: CreateMessageRequest) {
        return await this.messageRepository.create({
            chat: { id: dto.chatId },
            author: { id: dto.authorId },
            textMessage: dto.textMessage,
        });
    }
    async getMessagesPaginated(page: number, limit: number, roomId: string) {
        return await this.messageRepository.findByChatIdPaginated(roomId, page, limit);
    }
    async setUserOnline(userId: string, socketId: string) {
        await this.redis.sadd(`online:${userId}`, socketId);
    }

    async setUserOffline(userId: string, socketId: string) {
        await this.redis.srem(`online:${userId}`, socketId);
    }
    async isUserOnline(userId: string) {
        const count = await this.redis.scard(`online:${userId}`);
        return count > 0;
    }
}
