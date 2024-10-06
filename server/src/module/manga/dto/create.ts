import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateMangaDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  author?: string;

  @IsString()
  @IsOptional()
  chapter?: string;

  @IsString()
  @IsOptional()
  existsName?: string;

  @IsString()
  @IsOptional()
  type: 'long' | 'oneshot';
}
