import { IsOptional, IsString } from 'class-validator';

export class FindConversationDto {
  @IsString()
  @IsOptional()
  profile_id?: string;

  @IsString()
  @IsOptional()
  target?: string;
}
