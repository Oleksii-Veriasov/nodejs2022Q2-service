import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';

export class User {
  @ApiProperty({
    description: 'uuid v4',
    type: String,
  })
  @IsNotEmpty()
  @IsUUID()
  id: string;

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

  @ApiProperty({
    description: 'integer number, increments on update',
    type: Number,
  })
  @IsNotEmpty()
  @IsNumber()
  version: number;

  @ApiProperty({
    description: 'timestamp of creation',
    type: Number,
  })
  @IsNotEmpty()
  @IsNumber()
  createdAt: number;

  @ApiProperty({
    description: 'timestamp of last update',
    type: Number,
  })
  @IsNotEmpty()
  @IsNumber()
  updatedAt: number;
}
