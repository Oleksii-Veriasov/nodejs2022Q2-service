import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Track } from 'src/dto/track.dto';
import { CreateTrackDto } from 'src/dto/create.track.dto';
import { UpdateTrackDto } from 'src/dto/update.track.dto';

@Injectable()
export class TracksService {
  public tracks: Array<Track> = [
    {
      id: '8f725175-4068-49e1-b290-709b92ac3623',
      name: 'The Show Must Go On',
      artistId: 'c5392895-6b34-49d1-a4e0-7e7d528effe7',
      albumId: '3fa85f64-5717-4562-b3fc-2c963f66afa2',
      duration: 262,
    },
  ];

  public async findAll(): Promise<Array<Track>> {
    return await this.tracks;
  }

  public findOne(id: string): Track {
    const track: Track = this.tracks.find((track) => track.id === id);
    if (!track) {
      throw new NotFoundException(`Track with id ${id} doesn't exist`);
    }
    return track;
  }

  public async create(newTrack: CreateTrackDto): Promise<Track> {
    const trackData = {
      id: uuidv4(),
      name: newTrack.name,
      artistId: newTrack.artistId,
      albumId: newTrack.albumId,
      duration: newTrack.duration,
    };
    await this.tracks.push(trackData);
    return trackData;
  }

  public async update(id: string, newTrackData: UpdateTrackDto) {
    const track: Track = await this.tracks.find((track) => track.id === id);
    if (!track) {
      throw new NotFoundException(`Track with id ${id} doesn't exist`);
    }
    const trackIndex = await this.tracks.findIndex((track) => track.id === id);

    newTrackData.hasOwnProperty('name')
      ? (this.tracks[trackIndex].name = newTrackData.name)
      : null;
    newTrackData.hasOwnProperty('artistId')
      ? (this.tracks[trackIndex].artistId = newTrackData.artistId)
      : null;
    newTrackData.hasOwnProperty('albumId')
      ? (this.tracks[trackIndex].albumId = newTrackData.albumId)
      : null;
    newTrackData.hasOwnProperty('duration')
      ? (this.tracks[trackIndex].duration = newTrackData.duration)
      : null;
    return track;
  }

  public async delete(id: string): Promise<void> {
    const index: number = await this.tracks.findIndex(
      (track) => track.id === id,
    );
    if (index === -1) {
      throw new NotFoundException('Track not found.');
    }
    this.tracks.splice(index, 1);
  }

  public async setNullArtistId(id: string): Promise<void> {
    await this.tracks.forEach((track) => {
      track.artistId === id ? (track.artistId = null) : null;
    });
  }
  public async setNullAlbumId(id: string): Promise<void> {
    await this.tracks.forEach((track) => {
      track.albumId === id ? (track.albumId = null) : null;
    });
  }
}
