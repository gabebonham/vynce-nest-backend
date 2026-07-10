import { ProfileEntity } from "src/database/entity/profile.entity";
import { UserModel } from "src/user/user.model";
import { ProfileResponseDto } from "./profile-response.dto";

export class ProfileModel {
    id: string;
    user: UserModel;
    bannerUrl?: string;
    avatarUrl?: string;
    createdAt: Date;

    constructor(profileEntity: ProfileEntity) {
        this.id = profileEntity.id;
        this.user = new UserModel(profileEntity.user);
        this.bannerUrl = profileEntity.bannerUrl;
        this.avatarUrl = profileEntity.avatarUrl;
        this.createdAt = profileEntity.createdAt;
    }
    mapToResponseDto(): ProfileResponseDto {
        return {
            id: this.id,
            user: this.user.mapToResponseDto(),
            bannerUrl: this.bannerUrl || '',
            avatarUrl: this.avatarUrl || '',
            createdAt: this.createdAt
        };
    }
}