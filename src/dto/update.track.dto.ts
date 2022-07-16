import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateTrackDto {
  @ApiProperty({
    description: 'track name',
    type: String,
  })
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'refers to Artist',
    type: String,
  })
  @IsOptional()
  @IsUUID()
  artistId: string | null;

  @ApiProperty({
    description: 'refers to Album',
    type: String,
  })
  @IsOptional()
  @IsUUID()
  albumId: string | null;

  @ApiProperty({
    description: 'integer number',
    type: Number,
  })
  @IsOptional()
  @IsNumber()
  duration: number;
}
