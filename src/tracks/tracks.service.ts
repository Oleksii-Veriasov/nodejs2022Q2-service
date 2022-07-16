import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Track } from 'src/dto/track.dto';
import { CreateTrackDto } from 'src/dto/create.track.dto';
import { UpdateTrackDto } from 'src/dto/update.track.dto';

@Injectable()
export class TracksService {
  private tracks: Array<Track> = [
    {
      id: '3fa85f64-5717-4562-b3fc-2c963f66afab6',
      name: 'The Show Must Go On',
      artistId: '3fa85f64-5717-4562-b3fc-2c963f66afa0',
      albumId: '3fa85f64-5717-4562-b3fc-2c963f66afa2',
      duration: 262,
    },
  ];

  public findAll(): Array<Track> {
    console.log('track');
    return this.tracks;
  }

  public findOne(id: string): Track {
    const track: Track = this.tracks.find((track) => track.id === id);
    if (!track) {
      throw new NotFoundException(`Track with id ${id} doesn't exist`);
    }
    return track;
  }

  public create(newTrack: CreateTrackDto): Track {
    const track = {
      id: uuidv4(),
      name: newTrack.name,
      artistId: newTrack.artistId,
      albumId: newTrack.albumId,
      duration: newTrack.duration,
    };
    this.tracks.push(track);
    return track;
  }

  public update(id: string, newTrackData: UpdateTrackDto) {
    const track: Track = this.tracks.find((track) => track.id === id);
    if (!track) {
      throw new NotFoundException(`Track with id ${id} doesn't exist`);
    }
    const trackIndex = this.tracks.findIndex((track) => track.id === id);

    newTrackData.name
      ? (this.tracks[trackIndex].name = newTrackData.name)
      : null;
    newTrackData.artistId
      ? (this.tracks[trackIndex].artistId = newTrackData.artistId)
      : null;
    newTrackData.albumId
      ? (this.tracks[trackIndex].albumId = newTrackData.albumId)
      : null;
    newTrackData.duration
      ? (this.tracks[trackIndex].duration = newTrackData.duration)
      : null;

    return track;
  }

  public delete(id: string): void {
    const index: number = this.tracks.findIndex((track) => track.id === id);
    if (index === -1) {
      throw new NotFoundException('Track not found.');
    }
    this.tracks.splice(index, 1);
  }
}
