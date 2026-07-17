import {
  Controller,
  Post,
  Delete,
  Get,
  Body,
  UseGuards,
  Req,
  HttpCode,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { MatchService } from './match.service';
import { AuthGuard } from 'src/common/auth.guard';
import { CreateLikeDto } from './create-like.dto';
import { UnlikeDto } from './unlike.dto';
import { UserId } from 'src/common/user-id.decorator';

@UseGuards(AuthGuard)
@Controller('match')
export class MatchController {
  constructor(private readonly matchService: MatchService) {}

  @Post('like')
  @HttpCode(HttpStatus.OK)
  async like(@Req() req: any, @Body() dto: CreateLikeDto) {
    const profileId = req.user.id;
    return this.matchService.likeUser(profileId, dto.targetId);
  }

  @Delete('unlike')
  @HttpCode(HttpStatus.NO_CONTENT)
  async unlike(@Req() req: any, @Body() dto: UnlikeDto) {
    const profileId = req.user.id;
    await this.matchService.unlikeUser(profileId, dto.targetId);
  }

  @Get('/profile/:id')
  async getMatches(@Param('id') profileId: string) {
    return this.matchService.getMatchesForUser(profileId);
  }
}