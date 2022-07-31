import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ArtistEntity } from 'src/artists/entities/artist.entity';

export class CreateAlbumDto {
  @ApiProperty({
    description: 'album name',
    type: String,
  })
  @IsNotEmpty()
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
  artistId: string | null;
}
