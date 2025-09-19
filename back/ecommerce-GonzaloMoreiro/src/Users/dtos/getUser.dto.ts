import {
  IsEmail,
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsNumber,
  IsPositive,
  Min,
  Max,
} from 'class-validator';

export class GetUserDto {
  @IsString()
  @MinLength(3)
  @MaxLength(80)
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @Min(1000000)
  @Max(999999999999999)
  phone: number;

  @IsString()
  @MinLength(5)
  @MaxLength(20)
  country: string;

  @IsString()
  @MinLength(3)
  @MaxLength(80)
  address: string;

  @IsString()
  @MinLength(5)
  @MaxLength(20)
  city: string;
}
