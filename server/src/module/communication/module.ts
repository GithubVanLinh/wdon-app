import { Module } from '@nestjs/common';
import { FriendService } from './service/friend';
import { MongooseModule } from '@nestjs/mongoose';
import { Friend, FriendSchema } from './models/friends';
import { FriendController } from './controller/friend';
import { UserModule } from '../user/module';
import { ConversationService } from './service/conversation';
import { CommunicationGateway } from './gateway';
import { Conversation, ConversationSchema } from './models/conversation';
import { ConversationController } from './controller/conversation';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Friend.name, schema: FriendSchema },
      { name: Conversation.name, schema: ConversationSchema },
    ]),
    UserModule,
  ],
  controllers: [FriendController, ConversationController],
  providers: [FriendService, ConversationService, CommunicationGateway],
  exports: [FriendService, ConversationService],
})
export class CommunicationModule {}
