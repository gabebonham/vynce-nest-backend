import { Column, Entity, OneToOne, JoinColumn } from "typeorm";
import { BaseEntity } from "./base.entity";
import { UserEntity } from "./user.entity";

@Entity('profiles')
export class ProfileEntity extends BaseEntity {
    @OneToOne(() => UserEntity)
    @JoinColumn({ name: 'userId' }) 
    user!: UserEntity;
    @Column({ name: 'avatar_url', nullable: true })
    avatarUrl?: string;
    @Column({ name: 'banner_url', nullable: true })
    bannerUrl?: string;
}