import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { EventModule } from './events/event.module';
import { LocationModule } from './location/location.module';
import { ChatModule } from './chat/chat.module';
import { ProfileModule } from './profile/profile.module';

@Module({
  imports: [
    DatabaseModule,
    AuthModule, 
    ConfigModule.forRoot({ isGlobal: true }),
    EventModule,
    LocationModule,
    ChatModule,
    ProfileModule
  ],
})
export class AppModule {}
