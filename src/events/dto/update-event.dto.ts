import { Type } from "class-transformer"
import { IsDate, IsNumber, IsOptional, IsString } from "class-validator"

export class UpdateEventRequest {
    @IsString()
    @IsOptional()
    title?: string
    @IsOptional()
    @IsString()
    description?: string
    @IsOptional()
    @IsString()
    imageUrl?: string
    @IsOptional()
    @IsString()
    location?: string
    @IsOptional()
    @IsString()
    city?: string
    @IsOptional()
    @IsString()
    fullLocation?: string
    @IsOptional()
    @IsString()
    category?: string
    @IsOptional()
    @IsString()
    color?: string
    @IsOptional()
    @Type(() => Date)
    @IsDate()
    date?: Date
    @IsOptional()
    @IsNumber()
    participantsCount?: number
    @IsOptional()
    @IsNumber()
    maxParticipants?: number
    @IsOptional()
    @IsNumber()
    price?: number
    @IsOptional()
    @IsNumber()
    lat?: number
    @IsOptional()
    @IsNumber()
    lng?: number
}