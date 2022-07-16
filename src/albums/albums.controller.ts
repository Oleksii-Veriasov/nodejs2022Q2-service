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
import { Album } from 'src/dto/album.dto';
import { CreateAlbumDto } from 'src/dto/create.album.dto';
import { UpdateAlbumDto } from 'src/dto/update.album.dto';

import { AlbumsService } from './albums.service';

@Controller('album')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @Get()
  @HttpCode(200)
  public findAll(): Array<Album> {
    console.log('album');
    return this.albumsService.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  public findOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.albumsService.findOne(id);
  }

  @Post()
  @HttpCode(201)
  public create(@Body() newAlbum: CreateAlbumDto) {
    return this.albumsService.create(newAlbum);
  }

  @Delete(':id')
  @HttpCode(204)
  public delete(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): void {
    this.albumsService.delete(id);
  }

  @Put(':id')
  @HttpCode(200)
  public update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() newAlbumData: UpdateAlbumDto,
  ) {
    return this.albumsService.update(id, newAlbumData);
  }
}
