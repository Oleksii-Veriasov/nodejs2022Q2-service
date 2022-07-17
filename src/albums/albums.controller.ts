import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { Album } from 'src/dto/album.dto';
import { CreateAlbumDto } from 'src/dto/create.album.dto';
import { UpdateAlbumDto } from 'src/dto/update.album.dto';
import { FavoritesService } from 'src/favorites/favorites.service';

import { AlbumsService } from './albums.service';

@Controller('album')
export class AlbumsController {
  tracksService: any;
  constructor(
    private readonly albumsService: AlbumsService,
    private readonly favoritesService: FavoritesService,
  ) {}

  @Get()
  @HttpCode(200)
  public async findAll(): Promise<Array<Album>> {
    return await this.albumsService.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  public async findOne(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    return await this.albumsService.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  public async create(@Body() newAlbum: CreateAlbumDto) {
    const albumNew = await this.albumsService.create(newAlbum);
    return albumNew;
  }

  @Delete(':id')
  @HttpCode(204)
  public async delete(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<void> {
    try {
      await this.favoritesService.deleteOneAlbum(id);
      await this.tracksService.setNull('albumId', id);
    } catch {
      (ex) => console.log(ex);
    }
    await this.albumsService.delete(id);
  }

  @Put(':id')
  @HttpCode(200)
  public async update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() newAlbumData: UpdateAlbumDto,
  ) {
    return await this.albumsService.update(id, newAlbumData);
  }
}
