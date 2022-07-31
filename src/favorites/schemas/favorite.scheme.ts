import { ApiProperty } from '@nestjs/swagger';

export class FavoriteScheme {
  @ApiProperty({
    description: 'artists id',
  })
  artists: string[];

  @ApiProperty({
    description: 'albums id',
  })
  albums: string[];

  @ApiProperty({
    description: 'tracks id',
  })
  tracks: string[];
}
