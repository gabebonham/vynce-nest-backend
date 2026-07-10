import { Provider } from '@nestjs/common';
import { Client } from 'minio';

export const MINIO_CLIENT = 'MINIO_CLIENT';

export const MinioProvider: Provider = {
    provide: MINIO_CLIENT,
    useFactory: () => {
        return new Client({
            endPoint: process.env.MINIO_ENDPOINT || 'localhost',
            port: parseInt(process.env.MINIO_PORT || '9000'),
            useSSL: process.env.MINIO_USE_SSL === 'true',
            accessKey: process.env.MINIO_USER!,
            secretKey: process.env.MINIO_PASSWORD!,
        });
    },
};