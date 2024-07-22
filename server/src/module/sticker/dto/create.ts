import { Transform, Type } from 'class-transformer';
import {
  IsOptional,
  IsString,
  IsNumber,
  IsNotEmpty,
  IsEmpty,
  IsArray,
} from 'class-validator';

export class CreateStickerGroupDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmpty()
  num: number;

  @IsEmpty()
  owner: string;
}

export class CreateStickerDto {
  @IsString()
  @IsNotEmpty()
  key: string;

  @IsEmpty()
  path: string;
}

export class CreateStickersDto {
  @IsArray()
  @Transform((v) => String(v.value).split(' '))
  list: string[];
}
