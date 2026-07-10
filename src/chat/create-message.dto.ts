import { IsString } from "class-validator"

export class CreateMessageRequest {
  @IsString()
  chatId!: string
  @IsString()
  authorParticipantId!: string
  @IsString()
  textMessage!: string
}