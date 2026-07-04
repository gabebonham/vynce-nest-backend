import { Injectable } from "@nestjs/common";
import { BaseRepository } from "./base.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ChatEntity } from "../entity/chat.entity";

@Injectable()
export class ChatRepository extends BaseRepository<ChatEntity> {
    constructor(
        @InjectRepository(ChatEntity)
        repository: Repository<ChatEntity>,
    ) {
        super(repository);
    }

}