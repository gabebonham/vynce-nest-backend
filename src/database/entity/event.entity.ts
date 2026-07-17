import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";
import { BaseEntity } from "./base.entity";
import { UserEntity } from "./user.entity";

@Entity('events')
export class EventEntity extends BaseEntity {
    @Column()
    title!: string
    @Column()
    description!: string
    @Column({name: 'image_url'})
    imageUrl!: string
    @Column()
    location!: string
    @Column()
    city!: string
    @Column({name: 'full_location'})
    fullLocation!: string
    @Column()
    category!: string
    @Column()
    color!: string
    @Column({ type: 'timestamp' })
    date!: Date
    @Column({name: 'participants_count'})
    participantsCount!: number
    @Column({name: 'max_participants'})
    maxParticipants!: number
    @Column({name: 'host_id'})
    hostId!: string
    @ManyToOne(() => UserEntity)
    @JoinColumn({ name: 'host_id' })
    host!: UserEntity
    @Column()
    price!: number
    @Column({ type: 'double precision' })
    lat!: number
    @Column({ type: 'double precision' })
    lng!: number
}