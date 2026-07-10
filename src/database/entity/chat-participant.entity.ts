import { Entity, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { BaseEntity } from "./base.entity";
import { ProfileEntity } from "./profile.entity";
import { ChatEntity } from "./chat.entity";
import { MessageEntity } from "./message.entity";

@Entity('chat_participants')
export class ChatParticipantEntity extends BaseEntity {
    @ManyToOne(() => ProfileEntity)
    @JoinColumn({ name: 'profileId' })
    profile!: ProfileEntity;

    @ManyToOne(() => ChatEntity)
    @JoinColumn({ name: 'chatId' })
    chat!: ChatEntity;

    @OneToMany(() => MessageEntity, (message) => message.authorParticipant)
    messages!: MessageEntity[];
}