import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTrackDto {
  @ApiProperty({
    description: 'track name',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'refers to Artist',
    type: String,
  })
  @IsNotEmpty()
  artistId: string | null;

  @ApiProperty({
    description: 'refers to Album',
    type: String,
  })
  @IsNotEmpty()
  albumId: string | null;

  @ApiProperty({
    description: 'integer number',
    type: Number,
  })
  @IsNotEmpty()
  @IsNumber()
  duration: number;
}
