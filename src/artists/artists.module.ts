import { Module } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { ArtistsController } from './artists.controller';
import { TracksService } from 'src/tracks/tracks.service';
import { AlbumsService } from 'src/albums/albums.service';
import { FavoritesService } from 'src/favorites/favorites.service';
import { TracksModule } from 'src/tracks/tracks.module';
import { AlbumsModule } from 'src/albums/albums.module';
import { FavoritesModule } from 'src/favorites/favorites.module';

@Module({
  providers: [ArtistsService, TracksService, AlbumsService, FavoritesService],
  controllers: [ArtistsController],
  imports: [FavoritesModule, TracksModule, AlbumsModule],
})
export class ArtistsModule {}
