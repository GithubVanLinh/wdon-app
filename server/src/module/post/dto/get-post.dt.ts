import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class GetPostsDto {
  @ApiPropertyOptional()
  @IsOptional()
  profileId?: string;
}
