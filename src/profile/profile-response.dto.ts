import { UserResponseDto } from "src/user/user-response.dto";

export interface ProfileResponseDto {
    id: string;
    user:UserResponseDto;
    bannerUrl: string;
    avatarUrl: string;
    createdAt: Date;
}