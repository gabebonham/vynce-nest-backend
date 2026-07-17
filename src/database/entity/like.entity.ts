import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  Unique,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { ProfileEntity } from './profile.entity';

export enum LikeType {
  LIKE = 'like',
  DISLIKE = 'dislike',
  SUPERLIKE = 'superlike',
}

@Entity('likes')
@Unique(['userId', 'targetId'])
export class LikeEntity extends BaseEntity {
  @Column({ name: 'profile_id' })
  profileId!: string;

  @ManyToOne(() => ProfileEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'profile_id' })
  profile!: ProfileEntity;

  @Column({ name: 'target_id' })
  targetId!: string;

  @ManyToOne(() => ProfileEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'target_id' })
  target!: ProfileEntity;

  @Column({ type: 'enum', enum: LikeType, default: LikeType.LIKE })
  type!: LikeType;
}