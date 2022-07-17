import {
  BadRequestException,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { AlbumsService } from 'src/albums/albums.service';
import { ArtistsService } from 'src/artists/artists.service';
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
  public async findAll(): Promise<Favorite> {
    console.log('favorite');
    return await this.favoritesService.findAll();
  }

  @Post('/track/:id')
  @HttpCode(201)
  public async createTrack(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    const track = await this.tracksService.findOne(id);
    if (!track) {
      new BadRequestException(`Track with id: ${id} doesn't exist`);
    }
    return await this.favoritesService.crateOneTrack(id);
  }

  @Delete('/track/:id')
  @HttpCode(204)
  public async deleteTrack(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<void> {
    await this.favoritesService.deleteOneTrack(id);
  }

  @Post('/album/:id')
  @HttpCode(201)
  public async createAlbum(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    const album = await this.albumsService.findOne(id);
    if (!album) {
      new BadRequestException(`Album with id: ${id} doesn't exist`);
    }
    return await this.favoritesService.crateOneAlbum(id);
  }

  @Delete('/album/:id')
  @HttpCode(204)
  public async deleteAlbum(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<void> {
    await this.favoritesService.deleteOneAlbum(id);
  }

  @Post('/artist/:id')
  @HttpCode(201)
  public async createArtist(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    const artist = await this.artistsService.findOne(id);
    if (!artist) {
      new BadRequestException(`Artist with id: ${id} doesn't exist`);
    }
    return await this.favoritesService.crateOneArtist(id);
  }

  @Delete('/artist/:id')
  @HttpCode(204)
  public async deleteArtist(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<void> {
    await this.favoritesService.deleteOneArtist(id);
  }
}
