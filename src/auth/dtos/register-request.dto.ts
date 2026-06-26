import { IsNumber, IsString } from "class-validator"

export class RegisterRequest {
    @IsString()
    email!:string
    @IsString()
    name!:string
    @IsString()
    location!:string
    @IsNumber()
    age!:number
    @IsString()
    password!:string
}