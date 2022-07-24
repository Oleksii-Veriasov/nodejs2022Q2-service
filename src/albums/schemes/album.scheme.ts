import { ApiProperty } from '@nestjs/swagger';

export class AlbumScheme {
  @ApiProperty({
    description: 'uuid v4',
  })
  id: string;

  @ApiProperty({
    description: 'albums name',
  })
  name: string;

  @ApiProperty({
    description: 'album year',
  })
  year: number;

  @ApiProperty({
    description: 'refers to Artist',
  })
  artistId: string;
}
