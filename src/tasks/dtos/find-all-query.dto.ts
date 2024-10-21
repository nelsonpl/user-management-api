import { Transform, Type } from 'class-transformer';
import {
  IsNumber,
  IsOptional,
  IsObject,
  Min,
  IsArray,
  IsString,
} from 'class-validator';

export class FindAllQueryDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsString()
  priority?: string;

  @IsOptional()
  @IsNumber()
  @Min(1)
  page = 1;

  @IsOptional()
  @IsNumber()
  @Min(1)
  limit = 10;  
}
