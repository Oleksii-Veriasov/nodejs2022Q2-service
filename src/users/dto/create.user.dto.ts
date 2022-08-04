import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'login',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  login: string;

  @ApiProperty({
    description: 'password',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}
