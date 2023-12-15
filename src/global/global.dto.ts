import { Transform } from 'class-transformer';
import { IsOptional, IsString, MaxLength } from 'class-validator';

const SIZE = 20;

export class GenericQueryDto {
  @IsOptional()
  @IsString()
  @MaxLength(50)
  keyword?: string;

  @Transform(({ value }) => (/^\d+$/.test(value) ? parseInt(value) : 1))
  @IsOptional()
  page: number = 1;

  @Transform(({ value }) => (/^\d+$/.test(value) ? parseInt(value) : SIZE))
  @IsOptional()
  size: number = SIZE;
}
