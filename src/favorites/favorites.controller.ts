import {
  BadRequestException,
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
import { ArtistsService } from 'src/artists/artists/artists.service';
import { Favorite } from 'src/dto/favorite.dto';
import { TracksService } from 'src/tracks/tracks.service';
import { FavoritesService } from './favorites.service';

@Controller('favs')
export class FavoritesController {
  constructor(
    private readonly favoritesService: FavoritesService,
    private readonly tracksService: TracksService,
    private readonly albumsService: AlbumsService,
    private readonly artistsService: ArtistsService,
  ) {}

  @Get()
  @HttpCode(200)
  public findAll(): Favorite {
    console.log('favorite');
    return this.favoritesService.findAll();
  }

  @Post('/track/:id')
  @HttpCode(201)
  public createTrack(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    const track = this.tracksService.findOne(id);
    if (!track) {
      new BadRequestException(`Track with id: ${id} doesn't exist`);
    }
    return this.favoritesService.crateOneTrack(id);
  }

  @Delete('/track/:id')
  @HttpCode(204)
  public deleteTrack(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): void {
    this.favoritesService.deleteOneTrack(id);
  }

  @Post('/album/:id')
  @HttpCode(201)
  public createAlbum(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    const album = this.albumsService.findOne(id);
    if (!album) {
      new BadRequestException(`Album with id: ${id} doesn't exist`);
    }
    return this.favoritesService.crateOneAlbum(id);
  }

  @Delete('/album/:id')
  @HttpCode(204)
  public deleteAlbum(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): void {
    this.favoritesService.deleteOneAlbum(id);
  }

  @Post('/artist/:id')
  @HttpCode(201)
  public createArtist(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    const artist = this.artistsService.findOne(id);
    if (!artist) {
      new BadRequestException(`Artist with id: ${id} doesn't exist`);
    }
    return this.favoritesService.crateOneArtist(id);
  }

  @Delete('/artist/:id')
  @HttpCode(204)
  public deleteArtist(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): void {
    this.favoritesService.deleteOneArtist(id);
  }
}
