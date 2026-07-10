import {
    WebSocketGateway,
    WebSocketServer,
    SubscribeMessage,
    MessageBody,
    ConnectedSocket,
    OnGatewayConnection,
    OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { CreateMessageRequest } from './create-message.dto';
import { WsJwtGuard } from './ws-jwt.guard';
import { UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ChatService } from './chat.service';
import { HasReadMessageRequest } from './has-read-message-request.dto';

@WebSocketGateway({
    cors: { origin: '*' },
    namespace: '/chat',
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server!: Server;

    constructor(private readonly chatService: ChatService, private readonly jwtService: JwtService) { }

    async handleConnection(client: Socket) {
        try {
            const authHeader = client.handshake.headers.authorization;
            const authFromAuth = client.handshake.auth?.token;

            const rawToken = authHeader ?? authFromAuth;
            const token = rawToken?.startsWith('Bearer ')
                ? rawToken.split(' ')[1]
                : rawToken;

            const payload = this.jwtService.verify(token);
            client.data.user = payload;
            client.join(`user:${payload.sub}`);
        } catch (err: any) {
            client.emit('error', 'Unauthorized');
            client.disconnect();
        }
    }

    async handleDisconnect(client: Socket) {
        const user = client.data.user;
        if (!user) return;

        const rooms = Array.from(client.rooms);
        rooms.forEach((room) => {
            const isOwnRoom = room === client.id;
            const isPersonalRoom = room === `user:${user.sub}`;

            if (!isOwnRoom && !isPersonalRoom) {
                this.server.to(room).emit('userLeft', { userId: user.sub, room });
            }
        });

        await this.chatService.setUserOffline(user.sub, client.id);
    }

    @UseGuards(WsJwtGuard)
    @SubscribeMessage('joinRoom')
    async handleJoinRoom(
        @MessageBody() dto: { chatId: string, profileIds: string[] },
        @ConnectedSocket() client: Socket,
    ): Promise<{ status: string; data: any }> {
        try {
            client.join(dto.chatId);
            const res = await this.chatService.createParticipant(dto.chatId, dto.profileIds);
            return { status: 'ok', data:res };
        } catch (err: any) {
            return { status: 'error', data: err.message };
        }
    }

    @UseGuards(WsJwtGuard)
    @SubscribeMessage('sendMessage')
    async handleMessage(@MessageBody() dto: CreateMessageRequest) {
        try {
            const participantId = dto.authorParticipantId;
            const message = await this.chatService.saveMessage({ ...dto, authorParticipantId: participantId });
            this.server.to(dto.chatId).emit('newMessage', message);
            return { status: 'ok', data: message };
        } catch (err: any) {
            return { status: 'error', data: err.message };
        }
    }
    @UseGuards(WsJwtGuard)
    @SubscribeMessage('readMessage')
    async handleHasReadMessage(@MessageBody() dto: HasReadMessageRequest) {
        try {
            const participantId = dto.participantId;
            const res = await this.chatService.markMessageAsRead(dto.messageId, participantId);
            this.server.to(dto.chatId).emit('hasReadMessage', res);
            return { status: 'ok', data: res };
        } catch (err: any) {
            console.log('Error in handleHasReadMessage:', err.message);
            return { status: 'error', data: err.message };
        }
    }
}