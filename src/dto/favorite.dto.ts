import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
} from 'class-validator';

export class Favorite {
  @ApiProperty({
    description: 'favorite artists ids',
    type: Array,
  })
  @IsNotEmpty()
  @IsArray()
  artists: Array<string>;

  @ApiProperty({
    description: 'favorite albums ids',
    type: Array,
  })
  @IsNotEmpty()
  @IsArray()
  albums: Array<string>;

  @ApiProperty({
    description: 'favorite tracks ids',
    type: Array,
  })
  @IsNotEmpty()
  @IsArray()
  tracks: Array<string>;
}
