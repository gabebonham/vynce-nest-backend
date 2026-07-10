import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';
import { WsJwtGuard } from './ws-jwt.guard';
import { RedisProvider } from 'src/providers/redis.provider';
import { MessageEntity } from 'src/database/entity/message.entity';
import { ChatEntity} from 'src/database/entity/chat.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatRepository } from 'src/database/repository/chat.repository';
import { ChatController } from './chat.controller';
import { MessageRepository } from 'src/database/repository/message.repository';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MessageReadStatusRepository } from 'src/database/repository/message-read-status.repository';
import { ChatParticipantEntity } from 'src/database/entity/chat-participant.entity';
import { MessageReadStatusEntity } from 'src/database/entity/message-read-status.entity';
import { ChatParticipantRepository } from 'src/database/repository/chat-participant.repository';

@Module({
    controllers: [ChatController],
    imports: [
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                secret: configService.get<string>('JWT_SECRET'),
            }),
        }),
        TypeOrmModule.forFeature([ChatEntity, ChatParticipantEntity, MessageEntity, MessageReadStatusEntity]),
    ],
    providers: [
        ChatGateway, 
        ChatService, 
        WsJwtGuard, 
        RedisProvider, 
        ChatRepository, 
        MessageRepository,
        MessageReadStatusRepository,
        ChatParticipantRepository 
    ],
})
export class ChatModule { }