import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { Client } from 'minio';
import { MINIO_CLIENT } from 'src/providers/minio.provider';

@Injectable()
export class MinioService implements OnModuleInit {
    private readonly buckets = ['avatars', 'banners']; // ajusta pros buckets que você usa

    constructor(@Inject(MINIO_CLIENT) private readonly minioClient: Client) {}

    async onModuleInit() {
        for (const bucket of this.buckets) {
            const exists = await this.minioClient.bucketExists(bucket).catch(() => false);
            if (!exists) {
                await this.minioClient.makeBucket(bucket);
            }
        }
    }

    async uploadFile(bucket: string, fileName: string, buffer: Buffer, mimeType: string): Promise<string> {
        await this.minioClient.putObject(bucket, fileName, buffer, buffer.length, {
            'Content-Type': mimeType,
        });
        return fileName;
    }

    async getPresignedUrl(bucket: string, fileName: string, expirySeconds = 3600): Promise<string> {
        return this.minioClient.presignedGetObject(bucket, fileName, expirySeconds);
    }

    async getFileStream(bucket: string, fileName: string) {
        return this.minioClient.getObject(bucket, fileName);
    }

    async deleteFile(bucket: string, fileName: string): Promise<void> {
        await this.minioClient.removeObject(bucket, fileName);
    }
}