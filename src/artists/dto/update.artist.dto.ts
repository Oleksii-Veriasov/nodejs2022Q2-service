import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateArtistDto {
  @ApiProperty({
    description: 'artist name',
    type: String,
  })
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'is gramy',
    type: Boolean,
  })
  @IsOptional()
  @IsBoolean()
  grammy: boolean;
}
