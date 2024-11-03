import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class GetListMangaDTO {
  @ApiProperty()
  @IsNumber()
  @IsOptional()
  page?: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  pageLength?: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  search?: string;
}
