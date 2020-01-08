import {
  IsString,
  IsNotEmpty,
  IsUrl,
  IsNumber,
  IsPositive,
  IsCurrency,
  IsOptional,
  IsArray,
} from 'class-validator';

export class CreateMovieDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsUrl()
  @IsOptional()
  poster: string;

  @IsString()
  @IsOptional()
  @IsUrl()
  trailer: string;

  @IsNumber()
  @IsPositive()
  // eslint-disable-next-line @typescript-eslint/camelcase
  @IsCurrency({ allow_decimal: true })
  rentPrice: number;

  @IsNumber()
  @IsPositive()
  // eslint-disable-next-line @typescript-eslint/camelcase
  @IsCurrency({ allow_decimal: true })
  salePrice: number;

  @IsNumber({ maxDecimalPlaces: 0 })
  @IsPositive()
  stock: number;

  @IsArray()
  @IsOptional()
  tags: string[];
}
