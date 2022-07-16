import { Injectable, NotFoundException } from '@nestjs/common';
import { Artist } from 'src/dto/artist.dto';
import { v4 as uuidv4 } from 'uuid';
import { UpdateArtistDto } from 'src/dto/update.artist.dto';
import { CreateArtistDto } from 'src/dto/create.artist.dto';

@Injectable()
export class ArtistsService {
  private artists: Array<Artist> = [
    {
      id: '3fa85f64-5717-4562-b3fc-2c963f66afa1',
      name: 'Freddie Mercury',
      grammy: false,
    },
  ];

  public findAll(): Array<Artist> {
    console.log('artist');
    return this.artists;
  }

  public findOne(id: string): Artist {
    const artist: Artist = this.artists.find((artist) => artist.id === id);
    if (!artist) {
      throw new NotFoundException(`Artist with id ${id} doesn't exist`);
    }
    return artist;
  }

  public create(newArtist: CreateArtistDto): Artist {
    const artist = {
      id: uuidv4(),
      name: newArtist.name,
      grammy: newArtist.grammy,
    };
    this.artists.push(artist);
    return artist;
  }

  public update(id: string, newArtistData: UpdateArtistDto) {
    const artist: Artist = this.artists.find((artist) => artist.id === id);
    if (!artist) {
      throw new NotFoundException(`Artist with id ${id} doesn't exist`);
    }
    const artistIndex = this.artists.findIndex((artist) => artist.id === id);

    newArtistData.name
      ? (this.artists[artistIndex].name = newArtistData.name)
      : null;
    newArtistData.grammy
      ? (this.artists[artistIndex].grammy = newArtistData.grammy)
      : null;

    return artist;
  }

  public delete(id: string): void {
    const index: number = this.artists.findIndex((artist) => artist.id === id);
    if (index === -1) {
      throw new NotFoundException('Artist not found.');
    }
    this.artists.splice(index, 1);
  }
}
