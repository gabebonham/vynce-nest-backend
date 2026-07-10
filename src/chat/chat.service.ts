import { Inject, Injectable } from '@nestjs/common';
import { CreateMessageRequest } from './create-message.dto';
import { CreateChatRequest } from './create-chat.dto';
import { MessageRepository } from 'src/database/repository/message.repository';
import { ChatRepository } from 'src/database/repository/chat.repository';
import Redis from 'ioredis';
import { REDIS_CLIENT } from 'src/providers/redis.provider';
import { MessageReadStatusRepository } from 'src/database/repository/message-read-status.repository';
import { ChatParticipantRepository } from 'src/database/repository/chat-participant.repository';
import { In } from 'typeorm';

@Injectable()
export class ChatService {
    constructor(
        private readonly chatRepository: ChatRepository,
        private readonly messageRepository: MessageRepository,
        private readonly messageReadStatusRepository: MessageReadStatusRepository,
        private readonly chatParticipantRepository: ChatParticipantRepository,
        @Inject(REDIS_CLIENT) private readonly redis: Redis,
    ) { }
    async createChat(dto: CreateChatRequest) {
        const existingChat = await this.chatRepository.findAllPaginated(1, 1, { where: { eventId: dto.eventId } });
        if (existingChat.data.length > 0) {
            throw new Error('Chat already exists for this event');
        }
        const newChat = {
            ...dto,
            eventId: dto.eventId,
        }
        return await this.chatRepository.create(newChat);
    }
    async saveMessage(dto: CreateMessageRequest) {
        return await this.messageRepository.create({
            chat: { id: dto.chatId },
            authorParticipant: { id: dto.authorParticipantId },
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
    async markMessageAsRead(messageId: string, chatParticipantId: string) {
        const existingStatus = await this.messageReadStatusRepository.findAllPaginated(1, 1, {
            where: {
                message: { id: messageId },
                chatParticipant: { id: chatParticipantId },
            },
        });
        if (existingStatus.data.length > 0) {
            await this.messageReadStatusRepository.delete(existingStatus.data[0].id);
        }
        return await this.messageReadStatusRepository.create({
            message: { id: messageId },
            chatParticipant: { id: chatParticipantId },
            read: true,
        });
    }
    async hasUserReadMessage(messageId: string, userId: string) {
        const status = await this.messageReadStatusRepository.hasUserReadMessage(messageId, userId);
        return !!status;
    }

    async createParticipant(chatId: string, profileIds: string[]) {
        const existingParticipants = await this.chatParticipantRepository.findAllPaginated(1, profileIds.length, {
            where: {
                chat: { id: chatId },
                profile: { id: In(profileIds) },
            },
        });

        if (existingParticipants.data.length > 0) {
            return existingParticipants.data;
        }

        const chat = await this.chatRepository.findById(chatId);
        if (!chat) {
            throw new Error('Chat not found');
        }

        const participants = await Promise.all(
            profileIds.map((id) => this.chatParticipantRepository.create({ chat: { id: chatId }, profile: { id } }))
        );
        return participants;
    }
}
