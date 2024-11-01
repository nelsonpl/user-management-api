import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MinLength } from 'class-validator';
import { CreateUserDto } from '../../users/dto/create-user.dto';

export class RegisterDto extends CreateUserDto {
  @ApiProperty({ minLength: 6 })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}