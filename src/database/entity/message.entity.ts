import { Column, Entity, ManyToOne } from "typeorm";
import { BaseEntity } from "./base.entity";
import { ChatEntity } from "./chat.entity";
import { ProfileEntity } from "./profile.entity";

@Entity('messages')
export class MessageEntity extends BaseEntity {
    @ManyToOne(() => ChatEntity, (chat) => chat.messages)
    chat!: ChatEntity;

    @ManyToOne(() => ProfileEntity)
    author!: ProfileEntity;

    @Column()
    textMessage!: string;

    @Column({ nullable: true })
    deletedAt?: Date;
}

@Entity('message_read_status')
export class MessageReadStatusEntity extends BaseEntity {
    @ManyToOne(() => MessageEntity)
    message!: MessageEntity;

    @ManyToOne(() => ProfileEntity)
    user!: ProfileEntity;

    @Column({ default: false })
    read!: boolean;

    @Column({ default: false })
    received!: boolean;
}