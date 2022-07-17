import { Injectable, NotFoundException } from '@nestjs/common';
import { Favorite } from 'src/dto/favorite.dto';

@Injectable()
export class FavoritesService {
  private favorites: Favorite = {
    // {
    artists: [
      //     {
      '3fa85f64-7717-4562-b3fc-2c963f66afa6',
      //       name: 'Freddie Mercury',
      //       grammy: false,
      //     },
    ],
    albums: [
      //     {
      '3fa85f64-8717-4562-b3fc-2c963f66afa6',
      //       name: 'Innuendo',
      //       year: 1991,
      //       artistId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      //     },
    ],
    tracks: [
      //     {
      '3fa85f64-9717-4562-b3fc-2c963f66afa6',
      //       name: 'The Show Must Go On',
      //       artistId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      //       albumId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      //       duration: 262,
      //     },
    ],
    // },
  };

  public findAll(): Favorite {
    console.log('favorite');
    return this.favorites;
  }

  public crateOneTrack(id: string): void {
    this.favorites.tracks.push(id);
    // return track;
  }

  public deleteOneTrack(id: string): void {
    const index: number = this.favorites.tracks.findIndex(
      (track) => track === id,
    );
    if (index === -1) {
      throw new NotFoundException('Track not found.');
    }
    this.favorites.tracks.splice(index, 1);
  }

  public crateOneAlbum(id: string): void {
    this.favorites.albums.push(id);
    // return track;
  }

  public deleteOneAlbum(id: string): void {
    const index: number = this.favorites.albums.findIndex(
      (album) => album === id,
    );
    if (index === -1) {
      throw new NotFoundException('Album not found.');
    }
    this.favorites.albums.splice(index, 1);
  }

  public crateOneArtist(id: string): void {
    this.favorites.artists.push(id);
    // return track;
  }

  public deleteOneArtist(id: string): void {
    const index: number = this.favorites.artists.findIndex(
      (artist) => artist === id,
    );
    if (index === -1) {
      throw new NotFoundException('Artist not found.');
    }
    this.favorites.artists.splice(index, 1);
  }
}
