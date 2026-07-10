import { Injectable } from "@nestjs/common";
import { BaseRepository } from "./base.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ProfileEntity } from "../entity/profile.entity";

@Injectable()
export class ProfileRepository extends BaseRepository<ProfileEntity> {
    constructor(
        @InjectRepository(ProfileEntity)
        repository: Repository<ProfileEntity>,
    ) {
        super(repository);
    }

}