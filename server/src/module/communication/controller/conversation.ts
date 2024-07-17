import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ConversationService } from '../service/conversation';
import { CreateConversationDto } from '../dto/create-conversation';
import { ProfileId } from 'src/module/auth/decorators/user';

@ApiTags('conversations')
@Controller('conversations')
export class ConversationController {
  constructor(private conversationService: ConversationService) {}

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'create conversation',
    description: 'create conversation by name',
  })
  @Post('')
  async createConversation(
    @ProfileId() profileId: string,
    @Body() conversationDto: CreateConversationDto,
  ) {
    const conversation = await this.conversationService.find({});

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
