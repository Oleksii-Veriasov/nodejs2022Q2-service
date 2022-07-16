import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { TracksService } from 'src/tracks/tracks.service';
import { AlbumsService } from 'src/albums/albums.service';
import { ArtistsService } from 'src/artists/artists/artists.service';

@Module({
  providers: [FavoritesService, TracksService, AlbumsService, ArtistsService],
  controllers: [FavoritesController],
})
export class FavoritesModule {}
