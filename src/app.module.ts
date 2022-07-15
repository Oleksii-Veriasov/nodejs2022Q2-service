import { Module } from '@nestjs/common';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import { ArtistsModule } from './artists/artists.module';
import { TracksModule } from './tracks/tracks.module';
import { AlbumsModule } from './albums/albums.module';
import { FavoritesModule } from './favorites/favorites.module';

@Module({
  imports: [UsersModule, ArtistsModule, TracksModule, AlbumsModule, FavoritesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
