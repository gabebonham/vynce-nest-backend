import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  Unique,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { ProfileEntity } from './profile.entity';

@Entity('matches')
@Unique(['userAId', 'userBId'])
export class MatchEntity extends BaseEntity {
  @Column({ name: 'profile_a_id' })
  profileAId!: string;

  @ManyToOne(() => ProfileEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'profile_a_id' })
  profileA!: ProfileEntity;

  @Column({ name: 'profile_b_id' })
  profileBId!: string;

  @ManyToOne(() => ProfileEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'profile_b_id' })
  profileB!: ProfileEntity;

  @Column({ default: true })
  isActive!: boolean;
}