import { IsEmpty, IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { Media, PostAuthEnum } from '../model/post.schema';

export class CreatePostDto {
  @IsEmpty()
  profile: string;

  @IsEmpty()
  media: Media[];

  @IsOptional()
  content?: string;

  @IsOptional()
  tags: string[];

  @IsEnum(PostAuthEnum)
  @IsNotEmpty()
  auth: PostAuthEnum;
}
