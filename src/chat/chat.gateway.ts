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
            const token = client.handshake.auth?.token?.split(' ')[1];
            const payload = this.jwtService.verify(token);
            client.data.user = payload;
            client.join(`user:${payload.sub}`);
        } catch {
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

    @SubscribeMessage('joinRoom')
    handleJoinRoom(@MessageBody() dto: { chatId: string }, @ConnectedSocket() client: Socket) {
        client.join(dto.chatId);
    }

    @UseGuards(WsJwtGuard)
    @SubscribeMessage('sendMessage')
    async handleMessage(@MessageBody() dto: CreateMessageRequest, @ConnectedSocket() client: Socket) {
        console.log('HANDLER EXECUTOU', dto);
        const userId = client.data.user.sub;
        const message = await this.chatService.saveMessage({ ...dto, authorId: userId });
        console.log('MENSAGEM SALVA', message);
        this.server.to(dto.chatId).emit('newMessage', message);
        console.log('EMITIU newMessage');
    }
}