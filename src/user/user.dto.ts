import {
  IsEmail,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Length,
  Max,
  MaxLength,
  Min,
  MinLength,
  NotContains,
} from 'class-validator';
import { EUserStatus } from './user.enum';
import { PartialType } from '@nestjs/mapped-types';

export class CreateUserDto {
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  name: string;

  @IsString()
  @NotContains(' ', { message: 'No spaces allowed' })
  @Length(3, 50)
  username: string;

  @IsInt()
  @Min(4)
  @Max(100)
  @IsOptional()
  age: number;

  @IsEmail()
  email: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsEnum(EUserStatus)
  @IsOptional()
  status: EUserStatus;
}
