import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateChatRequest } from './dto/create-chat.dto';
import { ChatService } from './chat.service';
import { ChatEntity } from 'src/database/entity/chat.entity';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  async createChat(@Body() req: CreateChatRequest):Promise<ChatEntity> {
    return await this.chatService.createChat(req);
  }
  @Get('messages')
  async getMessagesPaginated(
    @Body('page') page: number,
    @Body('limit') limit: number,
    @Body('roomId') roomId: string
  ) {
    return await this.chatService.getMessagesPaginated(page, limit, roomId);
  }
  @Get()
  async getChatsPaginated(
    @Body('page') page: number,
    @Body('limit') limit: number,
  ) {
    return await this.chatService.getChatsPaginated(page, limit);
  }
}
