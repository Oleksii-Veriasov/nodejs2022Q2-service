import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { Artist } from 'src/dto/artist.dto';
import { CreateArtistDto } from 'src/dto/create.artist.dto';
import { UpdateArtistDto } from 'src/dto/update.artist.dto';

import { ArtistsService } from './artists.service';

@Controller('artist')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @Get()
  @HttpCode(200)
  public findAll(): Array<Artist> {
    console.log('artist');
    return this.artistsService.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  public findOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.artistsService.findOne(id);
  }

  @Post()
  @HttpCode(201)
  public create(@Body() newArtist: CreateArtistDto) {
    return this.artistsService.create(newArtist);
  }

  @Delete(':id')
  @HttpCode(204)
  public delete(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): void {
    this.artistsService.delete(id);
  }

  @Put(':id')
  @HttpCode(200)
  public update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() newArtistData: UpdateArtistDto,
  ) {
    return this.artistsService.update(id, newArtistData);
  }
}
