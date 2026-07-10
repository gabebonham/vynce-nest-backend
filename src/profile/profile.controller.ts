import { Body, Controller, Get, Param, Patch, Post, Put, Query, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './create-profile.dto';
import { AuthGuard } from 'src/common/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { MinioService } from 'src/minio/minio.service';
import { ProfileEntity } from 'src/database/entity/profile.entity';

@Controller('profiles')
@UseGuards(AuthGuard)
export class ProfileController {
    constructor(private profileService: ProfileService, private minioService: MinioService) { }

    @Post()
    async create(@Body() dto: CreateProfileDto) {
        return this.profileService.create(dto);
    }

    @Patch(':id/avatar')
    @UseInterceptors(FileInterceptor('file'))
    async uploadAvatar(@UploadedFile() file: Express.Multer.File, @Param('id') id: string) {
        const fileName = `${Date.now()}-${file.originalname}`;
        await this.minioService.uploadFile('avatars', fileName, file.buffer, file.mimetype);
        const url = await this.minioService.getPresignedUrl('avatars', fileName);
        await this.profileService.update(id, { avatarUrl: url });
        return { fileName, url };
    }
    @Patch(':id/banner')
    @UseInterceptors(FileInterceptor('file'))
    async uploadBanner(@UploadedFile() file: Express.Multer.File, @Param('id') id: string) {
        const fileName = `${Date.now()}-${file.originalname}`;
        await this.minioService.uploadFile('banners', fileName, file.buffer, file.mimetype);
        const url = await this.minioService.getPresignedUrl('banners',fileName);
        await this.profileService.update(id, { bannerUrl: url });
        return { fileName, url };
    }
    @Get('avatar')
    async getAvatar(@Query('fileName') fileName: string) {
        const url = await this.minioService.getPresignedUrl('avatars', fileName);
        return { url };
    }
    @Get('banner')
    async getBanner(@Query('fileName') fileName: string) {
        const url = await this.minioService.getPresignedUrl('banners', fileName);
        return { url };
    }
}