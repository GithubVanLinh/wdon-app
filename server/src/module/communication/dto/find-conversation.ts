import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ConversationTypeEnum } from '../models/conversation';

export class FindConversationDto {
  @IsString()
  @IsOptional()
  profile_id?: string;

  @IsString()
  @IsOptional()
  target?: string;

  @IsString()
  @IsEnum(ConversationTypeEnum)
  type?: ConversationTypeEnum;
}
