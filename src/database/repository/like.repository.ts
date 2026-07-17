import { Injectable } from "@nestjs/common";
import { BaseRepository } from "./base.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { LikeEntity } from "../entity/like.entity";

@Injectable()
export class LikeRepository extends BaseRepository<LikeEntity> {
    constructor(
        @InjectRepository(LikeEntity)
        repository: Repository<LikeEntity>,
    ) {
        super(repository);
    }

}