import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { TrackDto } from './dto/track.dto';
import { CreateTrackDto } from './dto/create.track.dto';
import { UpdateTrackDto } from './dto/update.track.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TrackEntity } from './entities/track.entity';

@Injectable()
export class TracksService {
  constructor(
    @InjectRepository(TrackEntity)
    private trackRepository: Repository<TrackEntity>,
  ) {}

  public async findAll() {
    return await this.trackRepository.find();
  }

  public async findOne(trackId: string) {
    const track = await this.trackRepository.findOne({
      where: { id: trackId },
    });
    if (track) return track;
    throw new NotFoundException(`Track with id ${trackId} doesn't exist`);
  }

  public async create(newTrack: CreateTrackDto) {
    const track = {
      id: uuidv4(),
      name: newTrack.name,
      artistId: newTrack.artistId,
      albumId: newTrack.albumId,
      duration: newTrack.duration,
    };
    return await this.trackRepository.create(track);
  }

  public async update(trackId: string, newTrackData: UpdateTrackDto) {
    const updateTrack = await this.trackRepository.findOne({
      where: { id: trackId },
    });
    if (!updateTrack) {
      throw new NotFoundException(`Track with id ${trackId} doesn't exist`);
    }
    Object.assign(updateTrack, newTrackData);
    return await this.trackRepository.save(updateTrack);
  }

  public async delete(trackId: string) {
    const result = await this.trackRepository.delete(trackId);
    if (result.affected === 0) {
      throw new NotFoundException(`Track with id ${trackId} was not found`);
    }
  }

  // public async setNullArtistId(id: string): Promise<void> {
  //   await this.tracks.forEach((track) => {
  //     track.artistId === id ? (track.artistId = null) : null;
  //   });
  // }
  // public async setNullAlbumId(id: string): Promise<void> {
  //   await this.tracks.forEach((track) => {
  //     track.albumId === id ? (track.albumId = null) : null;
  //   });
  // }
}
