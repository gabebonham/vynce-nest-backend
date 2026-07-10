import { Column, Entity, ManyToOne, OneToOne } from "typeorm";
import { BaseEntity } from "./base.entity";
import { ChatEntity } from "./chat.entity";
import { ProfileEntity } from "./profile.entity";
import { MessageReadStatusEntity } from "./message-read-status.entity";
import { ChatParticipantEntity } from "./chat-participant.entity";

@Entity('messages')
export class MessageEntity extends BaseEntity {
    @ManyToOne(() => ChatEntity, (chat) => chat.messages)
    chat!: ChatEntity;

    @ManyToOne(() => ChatParticipantEntity, (participant) => participant.messages)
    authorParticipant!: ChatParticipantEntity;

    @Column()
    textMessage!: string;

    @Column({ nullable: true })
    deletedAt?: Date;
    @OneToOne(() => MessageReadStatusEntity, (readStatus) => readStatus.message)
    readStatus!: MessageReadStatusEntity;
}
