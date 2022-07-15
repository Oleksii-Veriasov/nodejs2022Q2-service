import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdatePasswordDto {
  @ApiProperty({
    description: 'previous password',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  oldPassowrd: string;

  @ApiProperty({
    description: 'new password',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  newPassword: string;
}
