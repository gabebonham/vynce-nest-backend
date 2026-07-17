import { IsUUID } from 'class-validator';

export class UnlikeDto {
  @IsUUID()
  targetId!: string;
}