import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';
import { WsJwtGuard } from './ws-jwt.guard';
import { RedisProvider } from 'src/providers/redis.provider';
import { MessageEntity } from 'src/database/entity/message.entity';
import { ChatEntity, ChatParticipantEntity } from 'src/database/entity/chat.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatRepository } from 'src/database/repository/chat.repository';
import { ChatController } from './chat.controller';
import { MessageRepository } from 'src/database/repository/message.repository';

@Module({
    controllers: [ChatController],
    imports: [
        JwtModule.register({ secret: process.env.JWT_SECRET }),
        TypeOrmModule.forFeature([ChatEntity, ChatParticipantEntity, MessageEntity]),
    ],
    providers: [ChatGateway, ChatService, WsJwtGuard, RedisProvider, ChatRepository, MessageRepository],
})
export class ChatModule { }