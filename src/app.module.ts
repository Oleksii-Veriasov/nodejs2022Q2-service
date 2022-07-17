import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ArtistsModule } from './artists/artists.module';
import { TracksModule } from './tracks/tracks.module';
import { AlbumsModule } from './albums/albums.module';
import { FavoritesModule } from './favorites/favorites.module';
import { ArtistsController } from './artists/artists.controller';
import { TracksService } from './tracks/tracks.service';
import { AlbumsService } from './albums/albums.service';
import { FavoritesService } from './favorites/favorites.service';

@Module({
  imports: [
    UsersModule,
    ArtistsModule,
    TracksModule,
    AlbumsModule,
    FavoritesModule,
  ],
  controllers: [],
  providers: [
    ArtistsController,
    TracksService,
    AlbumsService,
    FavoritesService,
  ],
})
export class AppModule {}
