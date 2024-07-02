import {
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ConversationTypeEnum } from '../models/conversation';
import { Type } from 'class-transformer';

export class ParticipantDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsNotEmpty()
  profile: string;
}

export class CreateConversationDto {
  // @IsOptional()
  // @IsString()
  // owner?: string;

  @IsOptional()
  @IsEnum(ConversationTypeEnum)
  type: ConversationTypeEnum = ConversationTypeEnum.PERSONAL;

  @IsArray()
  @IsNotEmpty()
  @ValidateNested()
  @ArrayMinSize(1)
  @Type(() => ParticipantDto)
  participants: ParticipantDto[];
}
