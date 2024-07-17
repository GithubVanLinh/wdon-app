import { Module } from '@nestjs/common';
import { MyLogger } from './logger';
import { ElasticModule } from '../elastic.module';

@Module({
  imports: [ElasticModule],
  providers: [MyLogger],
  exports: [MyLogger],
})
export class LoggerModule {}
