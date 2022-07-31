import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { AlbumsService } from 'src/albums/albums.service';
import { ArtistDto } from './dto/artist.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateArtistDto } from './dto/create.artist.dto';
import { UpdateArtistDto } from './dto/update.artist.dto';
import { FavoritesService } from 'src/favorites/favorites.service';
import { TracksService } from 'src/tracks/tracks.service';
import { ArtistsService } from './artists.service';
import { ArtistScheme } from './schemes/artist.scheme';

@ApiTags('artist')
@Controller('artist')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @ApiOperation({ summary: 'Get all artist' })
  @ApiResponse({ status: HttpStatus.OK, type: [ArtistScheme] })
  @Get()
  @HttpCode(200)
  public async findAll() {
    return await this.artistsService.findAll();
  }

  @ApiOperation({ summary: 'Get one artist by Id' })
  @ApiResponse({ status: HttpStatus.OK, type: ArtistScheme })
  @Get(':id')
  @HttpCode(200)
  public async findOne(
    @Param('artistId', new ParseUUIDPipe({ version: '4' })) artistId: string,
  ) {
    return await this.artistsService.findOne(artistId);
  }

  @ApiOperation({ summary: 'Create artist' })
  @ApiResponse({ status: HttpStatus.CREATED, type: ArtistScheme })
  @Post()
  @HttpCode(201)
  public async create(@Body() newArtist: CreateArtistDto) {
    return await this.artistsService.create(newArtist);
  }

  @ApiOperation({ summary: 'Delete artist by Id' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  @Delete(':artistId')
  @HttpCode(204)
  public async delete(
    @Param('artistId', new ParseUUIDPipe({ version: '4' })) artistId: string,
  ) {
    await this.artistsService.delete(artistId);
  }

  @ApiOperation({ summary: 'Update artist by Id' })
  @ApiResponse({ status: HttpStatus.OK, type: ArtistScheme })
  @Put(':artistId')
  @HttpCode(200)
  public async update(
    @Param('artistId', new ParseUUIDPipe({ version: '4' })) artistId: string,
    @Body() newArtistData: UpdateArtistDto,
  ) {
    return await this.artistsService.update(artistId, newArtistData);
  }
}
