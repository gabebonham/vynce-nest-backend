import { UserEntity } from "src/database/entity/user.entity";
import { UserResponseDto } from "./user-response.dto";

export class UserModel {
    id: string;
    email: string;
    name: string;
    location: string;
    age: number;
    lat: number;
    lng: number;
    createdAt: Date;

    constructor(userEntity: UserEntity) {
        this.id = userEntity.id;
        this.email = userEntity.email;
        this.name = userEntity.name;
        this.location = userEntity.location;
        this.age = userEntity.age;
        this.lat = userEntity.lat;
        this.lng = userEntity.lng;
        this.createdAt = userEntity.createdAt;
    }
    mapToResponseDto(): UserResponseDto {
        return {
            id: this.id,
            email: this.email,
            name: this.name,
            location: this.location,
            age: this.age,
            lat: this.lat,
            lng: this.lng,
            createdAt: this.createdAt
        };
    }
}