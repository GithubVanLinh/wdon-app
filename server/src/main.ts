import { HttpAdapterHost, NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './module/app.module';
import { AllExceptionsFilter } from './module/error-handling';
import { ValidationPipe } from '@nestjs/common';
import { TransformInterceptor } from './module/transform.intercepter';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as path from 'path';
import { RedisIoAdapter } from './RedisAdapter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { MediaLinkInterceptor } from './intercepters/medialink';
import { MyLogger } from './module/logger/logger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: false,
  });

  const config = new DocumentBuilder()
    .setTitle('WDon Api')
    .setDescription('API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.enableCors();
  const httpAdapterHost = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapterHost));
  app.useLogger(app.get(MyLogger));

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
  app.useGlobalInterceptors(
    new TransformInterceptor(),
    new MediaLinkInterceptor(app.get(Reflector)),
  );

  const redisIoAdapter = new RedisIoAdapter(app);
  await redisIoAdapter.connectToRedis();

  app.useWebSocketAdapter(redisIoAdapter);

  await app.listen(3001);
}
bootstrap();
