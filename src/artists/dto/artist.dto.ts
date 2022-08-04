import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class ArtistDto {
  @ApiProperty({
    description: 'uuid v4',
    type: String,
  })
  @IsNotEmpty()
  @IsUUID()
  id: string;

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
