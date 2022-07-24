import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ArtistsModule } from './artists/artists.module';
import { TracksModule } from './tracks/tracks.module';
import { AlbumsModule } from './albums/albums.module';
import { FavoritesModule } from './favorites/favorites.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import configService from './ormconfig';

@Module({
  imports: [
    UsersModule,
    ArtistsModule,
    // TracksModule,
    AlbumsModule,
    // FavoritesModule,
    TypeOrmModule.forRoot(configService),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
