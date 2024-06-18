import { Module } from '@nestjs/common';
import { FriendService } from './service';
import { MongooseModule } from '@nestjs/mongoose';
import { Friend, FriendSchema } from './models/friends';
import { FriendController } from './controller';
import { UserModule } from '../user/module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Friend.name, schema: FriendSchema }]),
    UserModule,
  ],
  controllers: [FriendController],
  providers: [FriendService],
  exports: [FriendService],
})
export class CommunicationModule {}
