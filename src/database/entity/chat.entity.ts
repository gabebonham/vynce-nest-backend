import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity } from "./base.entity";
import { MessageEntity } from "./message.entity";
import { ProfileEntity } from "./profile.entity";

@Entity('chats')
export class ChatEntity extends BaseEntity {

    @OneToMany(() => ChatParticipantEntity, (p) => p.chat)
    participants!: ChatParticipantEntity[];

    @OneToMany(() => MessageEntity, (m) => m.chat)
    messages!: MessageEntity[];
    
    @Column()
    eventId!: string;
}

@Entity('chat_participants')
export class ChatParticipantEntity extends BaseEntity {
    @ManyToOne(() => ChatEntity, (chat) => chat.participants)
    chat!: ChatEntity;

    @ManyToOne(() => ProfileEntity)
    user!: ProfileEntity;
}