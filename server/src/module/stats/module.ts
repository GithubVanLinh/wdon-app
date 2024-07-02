import { Module } from '@nestjs/common';
import { UserModule } from '../user/module';
import { CommunicationModule } from '../communication/module';
import { StatsController } from './controller';

@Module({
  imports: [UserModule, CommunicationModule],
  controllers: [StatsController],
  providers: [],
  exports: [],
})
export class StatsModule {}
