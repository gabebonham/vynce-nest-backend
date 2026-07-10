import { IsNumber, IsOptional, IsString } from "class-validator"

export class UpdateUserDto {
    @IsString()
    @IsOptional()
    email!: string
    @IsOptional()
    @IsString()
    name!: string
    @IsOptional()
    @IsString()
    location!: string
    @IsOptional()
    @IsNumber()
    age!: number
    @IsOptional()
    @IsNumber()
    lat!: number
    @IsOptional()
    @IsNumber()
    lng!: number
}