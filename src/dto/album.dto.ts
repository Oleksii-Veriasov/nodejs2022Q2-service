import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';

export class Album {
  @ApiProperty({
    description: 'uuid v4',
    type: String,
  })
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @ApiProperty({
    description: 'album name',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'album name',
    type: String,
  })
  @IsNotEmpty()
  @IsNumber()
  year: number;

  @ApiProperty({
    description: 'refers to Artist',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  artistId: string | null;
}
