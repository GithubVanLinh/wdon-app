import { IsEmpty, IsOptional } from 'class-validator';
import { Media } from '../model/post.schema';

export class CreatePostDto {
  @IsEmpty()
  profile: string;

  @IsEmpty()
  media: Media[];

  @IsOptional()
  content: string;

  @IsOptional()
  tags: string[];
}
