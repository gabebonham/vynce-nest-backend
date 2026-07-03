import { Column, Entity } from "typeorm";
import { BaseEntity } from "./base.entity";

@Entity('events')
export class EventEntity extends BaseEntity {
    @Column()
    title!: string
    @Column()
    description!: string
    @Column()
    imageUrl!: string
    @Column()
    location!: string
    @Column()
    city!: string
    @Column()
    fullLocation!: string
    @Column()
    category!: string
    @Column()
    color!: string
    @Column({ type: 'timestamp' })
    date!: Date
    @Column()
    participantsCount!: number
    @Column()
    maxParticipants!: number
    @Column()
    hostId!: string
    @Column()
    price!: number
    @Column({ type: 'double precision' })
    lat!: number
    @Column({ type: 'double precision' })
    lng!: number
}