import { Module } from '@nestjs/common';
import { FriendService } from './service';
import { MongooseModule } from '@nestjs/mongoose';
import { Friend, FriendSchema } from './models/friends';
import { FriendController } from './controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Friend.name, schema: FriendSchema }]),
  ],
  controllers: [FriendController],
  providers: [FriendService],
  exports: [FriendService],
})
export class CommunicationModule {}
