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
import { Track } from 'src/dto/track.dto';
import { CreateTrackDto } from 'src/dto/create.track.dto';
import { UpdateTrackDto } from 'src/dto/update.track.dto';
import { TracksService } from './tracks.service';
import { FavoritesService } from 'src/favorites/favorites.service';

@Controller('track')
export class TracksController {
  constructor(
    private readonly tracksService: TracksService,
    private readonly favoritesService: FavoritesService,
  ) {}

  @Get()
  @HttpCode(200)
  public async findAll(): Promise<Array<Track>> {
    return await this.tracksService.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  public async findOne(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    return await this.tracksService.findOne(id);
  }

  @Post()
  @HttpCode(201)
  public async create(@Body() newTrack: CreateTrackDto) {
    return await this.tracksService.create(newTrack);
  }

  @Delete(':id')
  @HttpCode(204)
  public async delete(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<void> {
    try {
      this.favoritesService.deleteOneTrack(id);
    } catch {
      (ex) => console.log(ex);
    }
    await this.tracksService.delete(id);
  }

  @Put(':id')
  @HttpCode(200)
  public async update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() newTrackData: UpdateTrackDto,
  ) {
    return await this.tracksService.update(id, newTrackData);
  }
}
