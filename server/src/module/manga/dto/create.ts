import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateMangaDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  author?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  chapter?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  existsName?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ type: String, enum: ['long', 'oneshort'] })
  type: 'long' | 'oneshot';
}
