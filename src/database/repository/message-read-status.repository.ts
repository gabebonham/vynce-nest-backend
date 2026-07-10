import { Injectable } from "@nestjs/common";
import { BaseRepository } from "./base.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { MessageReadStatusEntity } from "../entity/message-read-status.entity";

@Injectable()
export class MessageReadStatusRepository extends BaseRepository<MessageReadStatusEntity> {
    constructor(
        @InjectRepository(MessageReadStatusEntity)
        repository: Repository<MessageReadStatusEntity>,
    ) {
        super(repository);
    }
    async hasUserReadMessage(messageId: string, chatParticipantId: string) {
        const status = await this.repository.findOne({
            where: {
                message: { id: messageId },
                chatParticipant: { id: chatParticipantId },
                read: true,
            }
        });
        return !!status;
    }
}