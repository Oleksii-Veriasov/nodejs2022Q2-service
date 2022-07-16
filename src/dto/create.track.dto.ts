import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';

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
  @IsUUID()
  artistId: string | null;

  @ApiProperty({
    description: 'refers to Album',
    type: String,
  })
  @IsNotEmpty()
  @IsUUID()
  albumId: string | null;

  @ApiProperty({
    description: 'integer number',
    type: Number,
  })
  @IsNotEmpty()
  @IsNumber()
  duration: number;
}
