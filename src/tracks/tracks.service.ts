import { Injectable, NotFoundException } from '@nestjs/common';
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
    const tracks = await this.trackRepository.find();
    return tracks.map((track) => track.toResponse());
  }

  public async findOne(trackId: string) {
    const track = await this.trackRepository.findOneBy({ id: trackId });
    if (track) return track.toResponse();
    throw new NotFoundException(`Track with id ${trackId} doesn't exist`);
  }

  public async create(newTrack: CreateTrackDto) {
    const track = {
      name: newTrack.name,
      artistId: newTrack.artistId,
      albumId: newTrack.albumId,
      duration: newTrack.duration,
    };
    const createTrack = await this.trackRepository.create(track);
    console.log(createTrack);
    return (await this.trackRepository.save(createTrack)).toResponse();
  }

  public async update(trackId: string, newTrackData: UpdateTrackDto) {
    const updateTrack = await this.trackRepository.findOneBy({ id: trackId });
    if (!updateTrack) {
      throw new NotFoundException(`Track with id ${trackId} doesn't exist`);
    }
    await Object.assign(updateTrack, newTrackData);
    const updatedTrack = await this.trackRepository.save(updateTrack);
    console.log(updatedTrack);
    return updatedTrack.toResponse();
  }

  public async delete(trackId: string) {
    const result = await this.trackRepository.delete(trackId);
    console.log('result.affected', result.affected);
    if (result.affected === 0) {
      throw new NotFoundException(`Track with id ${trackId} was not found`);
    }
  }
}
