import { Injectable } from "@nestjs/common";
import { BaseRepository } from "./base.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ChatParticipantEntity } from "../entity/chat-participant.entity";

@Injectable()
export class ChatParticipantRepository extends BaseRepository<ChatParticipantEntity> {
    constructor(
        @InjectRepository(ChatParticipantEntity)
        repository: Repository<ChatParticipantEntity>,
    ) {
        super(repository);
    }
}