import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './module/app.module';
import { AllExceptionsFilter } from './module/error-handling';
import { ValidationPipe } from '@nestjs/common';
import { TransformInterceptor } from './module/transform.intercepter';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as path from 'path';
import { RedisIoAdapter } from './RedisAdapter';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors();
  const httpAdapterHost = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapterHost));
  app.useStaticAssets(path.join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/',
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.useGlobalInterceptors(new TransformInterceptor());

  const redisIoAdapter = new RedisIoAdapter(app);
  await redisIoAdapter.connectToRedis();

  app.useWebSocketAdapter(redisIoAdapter);

  await app.listen(3001);
}
bootstrap();
