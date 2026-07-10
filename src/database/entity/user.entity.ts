import { Column, Entity } from "typeorm";
import { BaseEntity } from "./base.entity";

@Entity('users')
export class UserEntity extends BaseEntity {
    @Column()
    email!: string
    @Column()
    name!: string
    @Column()
    location!: string
    @Column()
    age!: number
    @Column()
    password!: string
    @Column({ type: 'double precision' })
    lat!: number
    @Column({ type: 'double precision' })
    lng!: number
}