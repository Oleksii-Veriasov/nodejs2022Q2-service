import { Module } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { TracksController } from './tracks.controller';
import { FavoritesService } from 'src/favorites/favorites.service';
import { FavoritesModule } from 'src/favorites/favorites.module';

@Module({
  providers: [TracksService, FavoritesService],
  controllers: [TracksController],
  imports: [FavoritesModule],
})
export class TracksModule {}
