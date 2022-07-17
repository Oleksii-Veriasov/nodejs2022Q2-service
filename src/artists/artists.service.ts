import { Injectable, NotFoundException } from '@nestjs/common';
import { Artist } from 'src/dto/artist.dto';
import { v4 as uuidv4 } from 'uuid';
import { UpdateArtistDto } from 'src/dto/update.artist.dto';
import { CreateArtistDto } from 'src/dto/create.artist.dto';

@Injectable()
export class ArtistsService {
  private artists: Array<Artist> = [
    {
      id: 'c5392895-6b34-49d1-a4e0-7e7d528effe7',
      name: 'Freddie Mercury',
      grammy: false,
    },
  ];

  public async findAll(): Promise<Array<Artist>> {
    // console.log('artist');
    return await this.artists;
  }

  public findOne(id: string): Artist {
    const artist: Artist = this.artists.find((artist) => artist.id === id);
    if (!artist) {
      throw new NotFoundException(`Artist with id ${id} doesn't exist`);
    }
    return artist;
  }

  public async create(newArtist: CreateArtistDto): Promise<Artist> {
    const artist = {
      id: uuidv4(),
      name: newArtist.name,
      grammy: newArtist.grammy,
    };
    await this.artists.push(artist);
    return artist;
  }

  public async update(id: string, newArtistData: UpdateArtistDto) {
    // console.log('artists:', this.artists);
    // console.log('newArtistId: ', id);
    // console.log('newArtistData: ', newArtistData);
    const artist: Artist = await this.artists.find(
      (artist) => artist.id === id,
    );
    if (!artist) {
      throw new NotFoundException(`Artist with id ${id} doesn't exist`);
    }
    const artistIndex = await this.artists.findIndex(
      (artist) => artist.id === id,
    );

    newArtistData.hasOwnProperty('name')
      ? (this.artists[artistIndex].name = newArtistData.name)
      : null;
    newArtistData.hasOwnProperty('grammy')
      ? (this.artists[artistIndex].grammy = newArtistData.grammy)
      : null;

    // console.log('new artist:', this.artists[artistIndex]);
    return await this.artists[artistIndex];
  }

  public async delete(id: string): Promise<void> {
    const index: number = await this.artists.findIndex(
      (artist) => artist.id === id,
    );
    if (index === -1) {
      throw new NotFoundException('Artist not found.');
    }
    await this.artists.splice(index, 1);
  }
}
