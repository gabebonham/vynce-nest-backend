import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { LikeEntity, LikeType } from 'src/database/entity/like.entity';
import { MatchEntity } from 'src/database/entity/match.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class MatchService {
    constructor(
        private readonly dataSource: DataSource,
        private readonly eventEmitter: EventEmitter2,
    ) { }

    async likeUser(profileId: string, targetId: string): Promise<{ matched: boolean; match?: MatchEntity }> {
        if (profileId === targetId) {
            throw new Error('Usuário não pode curtir a si mesmo');
        }

        return this.dataSource.transaction(async (manager) => {
            const likeRepo = manager.getRepository(LikeEntity);
            const matchRepo = manager.getRepository(MatchEntity);

            await likeRepo.upsert(
                { profileId, targetId, type: LikeType.LIKE },
                ['userId', 'targetId'],
            );

            const reciprocal = await likeRepo.findOne({
                where: { profileId: targetId, targetId: profileId, type: LikeType.LIKE },
            });

            if (!reciprocal) {
                return { matched: false };
            }

            const [profileAId, profileBId] = [profileId, targetId].sort();

            const existingMatch = await matchRepo.findOne({
                where: { profileAId, profileBId },
            });

            if (existingMatch) {
                return { matched: true, match: existingMatch };
            }

            const match = matchRepo.create({ profileAId, profileBId, isActive: true });
            await matchRepo.save(match);

            this.eventEmitter.emit('match.created', {
                profileAId,
                profileBId,
                matchId: match.id,
            });

            return { matched: true, match };
        });
    }

    async unlikeUser(profileId: string, targetId: string): Promise<void> {
        return this.dataSource.transaction(async (manager) => {
            const likeRepo = manager.getRepository(LikeEntity);
            const matchRepo = manager.getRepository(MatchEntity);

            await likeRepo.delete({ profileId, targetId });

            const [profileAId, profileBId] = [profileId, targetId].sort();
            await matchRepo.update({ profileAId, profileBId }, { isActive: false });
        });
    }

    async getMatchesForUser(profileId: string): Promise<MatchEntity[]> {
        return this.dataSource.getRepository(MatchEntity).find({
            where: [
                { profileAId: profileId, isActive: true },
                { profileBId: profileId, isActive: true },
            ],
            relations: {
                profileA: true,
                profileB: true,
            },
            order: { createdAt: 'DESC' },
        });
    }
}