import { IsString } from "class-validator"

export class HasReadMessageRequest {
    @IsString()
    chatId!: string
    @IsString()
    messageId!: string
    @IsString()
    participantId!: string
}