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
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ParticipantDto {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  profile: string;
}

export class CreateConversationDto {
  // @IsOptional()
  // @IsString()
  // owner?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsEnum(ConversationTypeEnum)
  type: ConversationTypeEnum = ConversationTypeEnum.PERSONAL;

  @ApiProperty({ isArray: true, type: ParticipantDto })
  @IsArray()
  @IsNotEmpty()
  @ValidateNested()
  @ArrayMinSize(1)
  @Type(() => ParticipantDto)
  participants: ParticipantDto[];
}
