import { IsString } from "class-validator"

export class CreateMessageRequest {
  @IsString()
  chatId!: string
  @IsString()
  authorId!: string
  @IsString()
  textMessage!: string
}