import { Module } from '@nestjs/common';
import { ArtistsService } from './artists/artists.service';
import { ArtistsController } from './artists/artists.controller';

@Module({
  providers: [ArtistsService],
  controllers: [ArtistsController]
})
export class ArtistsModule {}
