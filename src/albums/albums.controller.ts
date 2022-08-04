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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateAlbumDto } from 'src/albums/dto/create.album.dto';
import { UpdateAlbumDto } from 'src/albums/dto/update.album.dto';
import { AlbumsService } from './albums.service';
import { AlbumScheme } from './schemes/album.scheme';

@ApiTags('album')
@Controller('album')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @ApiOperation({ summary: 'Get all albums' })
  @ApiResponse({ status: HttpStatus.OK, type: [AlbumScheme] })
  @Get()
  @HttpCode(200)
  public async findAll() {
    return await this.albumsService.findAll();
  }

  @ApiOperation({ summary: 'Get one album by Id' })
  @ApiResponse({ status: HttpStatus.OK, type: AlbumScheme })
  @Get(':id')
  @HttpCode(200)
  public async findOne(
    @Param('albumId', new ParseUUIDPipe({ version: '4' })) albumId: string,
  ) {
    return await this.albumsService.findOne(albumId);
  }

  @ApiOperation({ summary: 'Create album' })
  @ApiResponse({ status: HttpStatus.CREATED, type: AlbumScheme })
  @Post()
  @HttpCode(201)
  public async create(@Body() newAlbum: CreateAlbumDto) {
    return await this.albumsService.create(newAlbum);
  }

  @ApiOperation({ summary: 'Delete album by Id' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  @Delete(':albumId')
  @HttpCode(204)
  public async delete(
    @Param('albumId', new ParseUUIDPipe({ version: '4' })) albumId: string,
  ) {
    await this.albumsService.delete(albumId);
  }

  @ApiOperation({ summary: 'Update album by Id' })
  @ApiResponse({ status: HttpStatus.OK, type: AlbumScheme })
  @Put(':albumId')
  @HttpCode(200)
  public async update(
    @Param('albumId', new ParseUUIDPipe({ version: '4' })) albumId: string,
    @Body() newAlbumData: UpdateAlbumDto,
  ) {
    return await this.albumsService.update(albumId, newAlbumData);
  }
}
