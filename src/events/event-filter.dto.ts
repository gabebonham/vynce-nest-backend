import { IsBoolean, IsOptional, IsString } from "class-validator"

export class EventFilterQuery {
    @IsString()
    @IsOptional()
    id?:string;
    @IsString()
    @IsOptional()
    category?:string;
    @IsString()
    @IsOptional()
    title?:string;
    @IsString()
    @IsOptional()
    minParticipants?:number;
    @IsString()
    @IsOptional()
    maxDistanceKm?:number;
    @IsString()
    @IsOptional()
    dateRange?:string;
    @IsBoolean()
    @IsOptional()
    onlyFavorites?:boolean;
}