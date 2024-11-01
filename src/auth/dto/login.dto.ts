import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';
import { IsCPF } from '../../users/validators/cpf.validator';

export class LoginDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsCPF()
  cpf: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;
}