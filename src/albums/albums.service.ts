import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Album } from 'src/dto/album.dto';
import { v4 as uuidv4 } from 'uuid';
import { UpdateAlbumDto } from 'src/dto/update.album.dto';
import { CreateAlbumDto } from 'src/dto/create.album.dto';

@Injectable()
export class AlbumsService {
  private albums: Array<Album> = [
    {
      id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      name: 'Innuendo',
      year: 1991,
      artistId: '3fa85f64-5717-4562-b3fc-2c963f66afa8',
    },
  ];

  public findAll(): Array<Album> {
    console.log('album');
    return this.albums;
  }

  public findOne(id: string): Album {
    const album: Album = this.albums.find((album) => album.id === id);
    if (!album) {
      throw new NotFoundException(`album with id ${id} doesn't exist`);
    }
    return album;
  }

  public create(newAlbum: CreateAlbumDto): Album {
    const album = {
      id: uuidv4(),
      name: newAlbum.name,
      year: newAlbum.year,
      artistId: newAlbum.artistId,
    };
    this.albums.push(album);
    return album;
  }

  public update(id: string, newAlbumData: UpdateAlbumDto) {
    const album: Album = this.albums.find((album) => album.id === id);
    if (!album) {
      throw new NotFoundException(`Album with id ${id} doesn't exist`);
    }
    const albumIndex = this.albums.findIndex((album) => album.id === id);

    newAlbumData.name
      ? (this.albums[albumIndex].name = newAlbumData.name)
      : null;
    newAlbumData.year
      ? (this.albums[albumIndex].year = newAlbumData.year)
      : null;
    newAlbumData.artistId
      ? (this.albums[albumIndex].artistId = newAlbumData.artistId)
      : null;

    return album;
  }

  public delete(id: string): void {
    const index: number = this.albums.findIndex((album) => album.id === id);
    if (index === -1) {
      throw new NotFoundException('Album not found.');
    }
    this.albums.splice(index, 1);
  }
}
