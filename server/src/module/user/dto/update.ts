import { IsEmpty } from 'class-validator';

export class UpdateProfileDto {
  @IsEmpty()
  avatar?: string;

  @IsEmpty()
  background?: string;
}
