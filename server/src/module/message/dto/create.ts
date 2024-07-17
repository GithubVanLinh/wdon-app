import {
  ApiHideProperty,
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  IsEmpty,
  IsNotEmpty,
  IsMongoId,
} from 'class-validator';

export class CreateMessageDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  conversation_id: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  from: string;

  // @ApiProperty()
  // @IsOptional()
  // @IsString()
  // to: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  message?: string;

  @ApiHideProperty()
  @IsOptional()
  @IsEmpty()
  media?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  emoji?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  sticker?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  gif?: string;
}
