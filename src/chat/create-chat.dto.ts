
import { IsString } from "class-validator"

export class CreateChatRequest {
    @IsString()
    eventId!: string
}