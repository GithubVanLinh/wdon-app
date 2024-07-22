
import { IsOptional, IsString, IsNumber } from "class-validator";

export class UpdateStickerDto {
	@IsOptional()
	@IsString()
	name: string

	@IsOptional()
	@IsString()
	stickers: string

	@IsOptional()
	@IsString()
	owner: string

	@IsOptional()
	@IsNumber()
	num: number
}
  