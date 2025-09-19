import {
  IsEmail,
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsNumber,
  IsStrongPassword,
  Matches,
  IsPositive,
  Min,
  Max,
  IsEmpty,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(3)
  @MaxLength(80)
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  /**
   * @example Strong!Pass23
   */
  @IsString()
  @MaxLength(15)
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
  })
  @Matches(/^[A-Za-z\d!@#$%^&*]+$/, {
    message: 'Solo se permiten los siguientes simbolos: !@#$%^&*',
  })
  @Matches(/[!@#$%^&*]/, {
    message: 'Debe incluir algunos de los siguientes simbolos: @#$%^&*',
  })
  @IsNotEmpty()
  password: string;

  /**
   * @example Strong!Pass23
   */

  @IsString()
  @MaxLength(15)
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
  })
  @Matches(/^[A-Za-z\d!@#$%^&*]+$/, {
    message: 'Solo se permiten los siguientes simbolos: !@#$%^&*',
  })
  @Matches(/[!@#$%^&*]/, {
    message: 'Debe incluir algunos de los siguientes simbolos: @#$%^&*',
  })
  @IsNotEmpty()
  confirmPassword: string;

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

  @IsEmpty()
  isAdmin?: boolean;
}
