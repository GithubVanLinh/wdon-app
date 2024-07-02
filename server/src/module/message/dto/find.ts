import { IsOptional, IsString, IsNumber } from 'class-validator';

export class FindMessageDto {
  @IsOptional()
  @IsString()
  from: string;

  @IsOptional()
  @IsString()
  to: string;

  @IsOptional()
  @IsString()
  message: string;

  @IsOptional()
  @IsString()
  media: string;
}
