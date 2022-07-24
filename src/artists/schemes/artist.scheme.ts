import { ApiProperty } from '@nestjs/swagger';

export class ArtistScheme {
  @ApiProperty({
    description: 'uuid v4',
  })
  id: string;

  @ApiProperty({
    description: 'artist name',
  })
  name: string;

  @ApiProperty({
    description: 'artist have grammy awards',
  })
  grammy: boolean;
}
