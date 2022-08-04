import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';

export class Favorite {
  @ApiProperty({
    description: 'favorite artists ids',
    type: Array,
  })
  @IsArray()
  artists: Array<string>;

  @ApiProperty({
    description: 'favorite albums ids',
    type: Array,
  })
  @IsArray()
  albums: Array<string>;

  @ApiProperty({
    description: 'favorite tracks ids',
    type: Array,
  })
  @IsArray()
  tracks: Array<string>;
}
