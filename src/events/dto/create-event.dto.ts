import { Type } from "class-transformer"
import { IsDate, IsNumber, IsString } from "class-validator"

export class CreateEventRequest {
    @IsString()
    title!: string
    @IsString()
    description!: string
    @IsString()
    imageUrl!: string
    @IsString()
    location!: string
    @IsString()
    city!: string
    @IsString()
    fullLocation!: string
    @IsString()
    category!: string
    @IsString()
    color!: string
    @Type(() => Date)
    @IsDate()
    date!: Date
    @IsNumber()
    participantsCount!: number
    @IsNumber()
    maxParticipants!: number
    @IsNumber()
    price!: number
    @IsNumber()
    lat!: number
    @IsNumber()
    lng!: number
}