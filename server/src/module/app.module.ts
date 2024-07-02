import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guard/jwt';
import { UserModule } from './user/module';
import { PostModule } from './post/module';
import { SocketModule } from './socket/module';
import { StatsModule } from './stats/module';
import { MediaModule } from './media/module';
import { MessageModule } from './message/module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    AuthModule,
    UserModule,
    PostModule,
    SocketModule,
    StatsModule,
    MediaModule,
    MessageModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
