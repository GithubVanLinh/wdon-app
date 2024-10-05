import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/module';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guard/jwt';
import { UserModule } from './user/module';
import { PostModule } from './post/module';
import { SocketModule } from './socket/module';
import { StatsModule } from './stats/module';
import { MediaModule } from './media/module';
import { MessageModule } from './message/module';
import { TimeExecuteInterceptor } from 'src/intercepters/timequery';
// import { ElasticModule } from './elastic.module';
// import { LoggerModule } from './logger/module';
import { AppLoggerMiddleware } from './middleware';
import { StickerModule } from './sticker/module';
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
    // ElasticModule,
    // LoggerModule,
    StickerModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    TimeExecuteInterceptor,
    {
      provide: APP_INTERCEPTOR,
      useExisting: TimeExecuteInterceptor,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AppLoggerMiddleware).forRoutes('*');
  }
}
