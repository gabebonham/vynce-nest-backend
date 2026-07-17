import { Injectable } from "@nestjs/common";
import { BaseRepository } from "./base.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { MatchEntity } from "../entity/match.entity";

@Injectable()
export class MatchRepository extends BaseRepository<MatchEntity> {
    constructor(
        @InjectRepository(MatchEntity)
        repository: Repository<MatchEntity>,
    ) {
        super(repository);
    }

}