import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';

export class CreateAlbumDto {
  @ApiProperty({
    description: 'album name',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'album year',
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
