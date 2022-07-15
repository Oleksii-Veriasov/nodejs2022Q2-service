import { Module } from '@nestjs/common';
import { AlbumsService } from './albums/albums.service';
import { AlbumsController } from './albums/albums.controller';

@Module({
  providers: [AlbumsService],
  controllers: [AlbumsController]
})
export class AlbumsModule {}
