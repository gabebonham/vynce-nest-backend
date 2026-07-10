import { Column, Entity, OneToOne, JoinColumn } from "typeorm";
import { BaseEntity } from "./base.entity";
import { MessageEntity } from "./message.entity";
import { ProfileEntity } from "./profile.entity";
import { ChatParticipantEntity } from "./chat-participant.entity";

@Entity('message_read_status')
export class MessageReadStatusEntity extends BaseEntity {
    @OneToOne(() => ChatParticipantEntity)
    @JoinColumn({ name: 'chatParticipantId' })
    chatParticipant!: ChatParticipantEntity;
    @OneToOne(() => MessageEntity)
    @JoinColumn({ name: 'messageId' })
    message!: MessageEntity;
    @Column()
    read!: boolean;
}
