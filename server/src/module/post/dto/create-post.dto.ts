import { IsEmpty, IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { Media, PostAuthEnum } from '../model/post.schema';
import {
  ApiHideProperty,
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';

export class CreatePostDto {
  @IsEmpty()
  @ApiHideProperty()
  profile: string;

  @IsEmpty()
  @ApiHideProperty()
  media: Media[];

  @IsOptional()
  @ApiPropertyOptional({
    description: 'your content in text',
  })
  content?: string;

  @IsOptional()
  @ApiPropertyOptional({
    description: 'list tag of post',
    type: [String],
  })
  tags: string[];

  @IsEnum(PostAuthEnum)
  @IsNotEmpty()
  @ApiProperty({
    description: 'type of auth',
    enum: PostAuthEnum,
    type: () => PostAuthEnum,
  })
  auth: PostAuthEnum;
}
