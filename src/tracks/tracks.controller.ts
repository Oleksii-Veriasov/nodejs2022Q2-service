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

@Controller('track')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @Get()
  @HttpCode(200)
  public findAll(): Array<Track> {
    console.log('track');
    return this.tracksService.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  public findOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.tracksService.findOne(id);
  }

  @Post()
  @HttpCode(201)
  public create(@Body() newTrack: CreateTrackDto) {
    return this.tracksService.create(newTrack);
  }

  @Delete(':id')
  @HttpCode(204)
  public delete(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): void {
    this.tracksService.delete(id);
  }

  @Put(':id')
  @HttpCode(200)
  public update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() newTrackData: UpdateTrackDto,
  ) {
    return this.tracksService.update(id, newTrackData);
  }
}
