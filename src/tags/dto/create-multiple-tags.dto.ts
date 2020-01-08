import { IsArray, IsString, IsNotEmpty } from 'class-validator';

export class CreateMultipleTagsDto {
  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  tags: string[];
}
