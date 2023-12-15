import {
  IsEmail,
  IsInt,
  IsOptional,
  IsString,
  IsStrongPassword,
  Length,
  Matches,
  Max,
  MaxLength,
  Min,
  MinLength,
  NotContains,
} from 'class-validator';

export class SignInDto {
  @IsString()
  @NotContains(' ', { message: 'No spaces allowed' })
  @Length(3, 20)
  username: string;

  @NotContains(' ', { message: 'No spaces allowed' })
  @Length(6, 32)
  @IsStrongPassword(
    {
      minLength: 6,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    },
    {
      message: 'password too weak',
    },
  )
  password: string;
}

export class SignupDto extends SignInDto {
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  name: string;

  @IsInt()
  @Min(4)
  @Max(100)
  @IsOptional()
  age: number;

  @IsEmail()
  email: string;
}
