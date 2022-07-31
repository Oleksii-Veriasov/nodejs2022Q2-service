import { Injectable, NotFoundException } from '@nestjs/common';
import { Favorite } from './dto/favorite.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FavoriteEntity } from './entities/favorite.entity';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(FavoriteEntity)
    private favoriteRepository: Repository<FavoriteEntity>,
  ) {}

  public async findAll() {
    return await this.favoriteRepository.find();
  }

  // public crateOneTrack(id: string): void {
  //   this.favorites.tracks.push(id);
  //   // return track;
  // }

  // public deleteOneTrack(id: string): void {
  //   const index: number = this.favorites.tracks.findIndex(
  //     (track) => track === id,
  //   );
  //   if (index === -1) {
  //     throw new NotFoundException('Track not found.');
  //   }
  //   this.favorites.tracks.splice(index, 1);
  // }

  // public crateOneAlbum(id: string): void {
  //   this.favorites.albums.push(id);
  //   // return track;
  // }

  // public deleteOneAlbum(id: string): void {
  //   const index: number = this.favorites.albums.findIndex(
  //     (album) => album === id,
  //   );
  //   if (index === -1) {
  //     throw new NotFoundException('Album not found.');
  //   }
  //   this.favorites.albums.splice(index, 1);
  // }

  // public crateOneArtist(id: string): void {
  //   this.favorites.artists.push(id);
  //   // return track;
  // }

  // public deleteOneArtist(id: string): void {
  //   const index: number = this.favorites.artists.findIndex(
  //     (artist) => artist === id,
  //   );
  //   if (index === -1) {
  //     throw new NotFoundException('Artist not found.');
  //   }
  //   this.favorites.artists.splice(index, 1);
  // }
}
