import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateArtistDto {
  @ApiProperty({
    description: 'artist name',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'is gramy',
    type: Boolean,
  })
  @IsNotEmpty()
  @IsBoolean()
  grammy: boolean;
}
