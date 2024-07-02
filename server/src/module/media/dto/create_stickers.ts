import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateStickersDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;
}
