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
import { TrackDto } from './dto/track.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateTrackDto } from './dto/create.track.dto';
import { UpdateTrackDto } from './dto/update.track.dto';
import { TracksService } from './tracks.service';
// import { FavoritesService } from 'src/favorites/favorites.service';
import { TrackScheme } from './schemas/track.scheme';

@ApiTags('track')
@Controller('track')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @ApiOperation({ summary: 'Get all tracks' })
  @ApiResponse({ status: HttpStatus.OK, type: [TrackScheme] })
  @Get()
  @HttpCode(200)
  public async findAll() {
    return await this.tracksService.findAll();
  }

  @ApiOperation({ summary: 'Get one track by Id' })
  @ApiResponse({ status: HttpStatus.OK, type: TrackScheme })
  @Get(':trackId')
  @HttpCode(200)
  public async findOne(
    @Param('trackId', new ParseUUIDPipe({ version: '4' })) trackId: string,
  ) {
    return await this.tracksService.findOne(trackId);
  }

  @ApiOperation({ summary: 'Create track' })
  @ApiResponse({ status: HttpStatus.CREATED, type: TrackScheme })
  @Post()
  @HttpCode(201)
  public async create(@Body() newTrack: CreateTrackDto) {
    return await this.tracksService.create(newTrack);
  }

  @ApiOperation({ summary: 'Delete track by Id' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  @Delete(':trackId')
  @HttpCode(204)
  public async delete(
    @Param('trackId', new ParseUUIDPipe({ version: '4' })) trackId: string,
  ) {
    await this.tracksService.delete(trackId);
  }

  @ApiOperation({ summary: 'Update track by Id' })
  @ApiResponse({ status: HttpStatus.OK, type: TrackScheme })
  @Put(':trackId')
  @HttpCode(200)
  public async update(
    @Param('trackId', new ParseUUIDPipe({ version: '4' })) trackId: string,
    @Body() newTrackData: UpdateTrackDto,
  ) {
    return await this.tracksService.update(trackId, newTrackData);
  }
}
