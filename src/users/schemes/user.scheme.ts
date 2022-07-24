import { ApiProperty } from '@nestjs/swagger';

export class UserScheme {
  @ApiProperty({
    description: 'uuid v4',
  })
  id: string;

  @ApiProperty({
    description: 'login',
  })
  login: string;

  @ApiProperty({
    description: 'password',
  })
  password: string;

  @ApiProperty({
    description: 'integer number, increments on update',
  })
  version: number;

  @ApiProperty({
    description: 'timestamp of creation',
  })
  createdAt: number;

  @ApiProperty({
    description: 'timestamp of last update',
  })
  updatedAt: number;
}
