import { ApiProperty } from '@nestjs/swagger';

export class TrackScheme {
  @ApiProperty({
    description: 'uuid v4',
  })
  id: string;

  @ApiProperty({
    description: 'tracks name',
  })
  name: string;

  @ApiProperty({
    description: 'refers to Album',
  })
  albumId: string;

  @ApiProperty({
    description: 'refers to Artist',
  })
  artistId: string;

  @ApiProperty({
    description: 'track duration',
  })
  duration: string;
}
