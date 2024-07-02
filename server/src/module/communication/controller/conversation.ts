import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ConversationService } from '../service/conversation';
import { CreateConversationDto } from '../dto/create-conversation';
import { ProfileId } from 'src/module/auth/decorators/user';
import { FindConversationDto } from '../dto/find-conversation';
import { ConversationTypeEnum } from '../models/conversation';

@ApiTags('conversations')
@Controller('conversations')
export class ConversationController {
  constructor(private conversationService: ConversationService) {}

  @Post('')
  async createConversation(
    @ProfileId() profileId: string,
    @Body() conversationDto: CreateConversationDto,
  ) {
    return await this.conversationService.create({
      type: conversationDto.type,
      owner: profileId,
      participants: [{ profile: profileId }, ...conversationDto.participants],
    });
  }

  @Get()
  async find(
    @ProfileId() profileId: string,
    // @Query() body: FindConversationDto,
  ) {
    return await this.conversationService.find({
      profile_id: profileId,
    });
  }
}
