import { Module } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
import { FavoritesService } from 'src/favorites/favorites.service';
import { FavoritesModule } from 'src/favorites/favorites.module';

@Module({
  providers: [AlbumsService, FavoritesService],
  controllers: [AlbumsController],
  imports: [FavoritesModule],
})
export class AlbumsModule {}
