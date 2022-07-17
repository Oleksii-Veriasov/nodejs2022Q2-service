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
import { AlbumsService } from 'src/albums/albums.service';
import { Artist } from 'src/dto/artist.dto';
import { CreateArtistDto } from 'src/dto/create.artist.dto';
import { UpdateArtistDto } from 'src/dto/update.artist.dto';
import { FavoritesService } from 'src/favorites/favorites.service';
import { TracksService } from 'src/tracks/tracks.service';
import { ArtistsService } from './artists.service';

@Controller('artist')
export class ArtistsController {
  constructor(
    private readonly artistsService: ArtistsService,
    private readonly tracksService: TracksService,
    private readonly albumsService: AlbumsService,
    private readonly favoritesService: FavoritesService,
  ) {}

  @Get()
  @HttpCode(200)
  public async findAll(): Promise<Array<Artist>> {
    // console.log('artist');
    return await this.artistsService.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  public async findOne(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    return await this.artistsService.findOne(id);
  }

  @Post()
  @HttpCode(201)
  public async create(@Body() newArtist: CreateArtistDto) {
    return await this.artistsService.create(newArtist);
  }

  @Delete(':id')
  @HttpCode(204)
  public async delete(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<void> {
    try {
      console.log('delate artist', id);
      // console.log('favorites');
      // await this.favoritesService.deleteOneArtist(id);
      console.log('tracks');
      await this.tracksService.setNullArtistId(id);
      await this.tracksService.setNullAlbumId(id);
      console.log('albums');
      await this.albumsService.setNullArtistId(id);
    } catch {
      (ex) => console.log(ex);
    }
    await this.artistsService.delete(id);
  }

  @Put(':id')
  @HttpCode(200)
  public async update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() newArtistData: UpdateArtistDto,
  ) {
    return await this.artistsService.update(id, newArtistData);
  }
}
