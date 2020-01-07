import {
  IsString,
  IsNotEmpty,
  IsUrl,
  IsNumber,
  IsPositive,
  IsCurrency,
} from 'class-validator';

export class CreateMovieDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  @IsUrl()
  poster: string;

  @IsString()
  @IsNotEmpty()
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
}
