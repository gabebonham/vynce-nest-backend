import { IsUUID, IsOptional, IsEnum } from 'class-validator';
import { LikeType } from 'src/database/entity/like.entity';

export class CreateLikeDto {
  @IsUUID()
  targetId!: string;

  @IsOptional()
  @IsEnum(LikeType)
  type?: LikeType;
}