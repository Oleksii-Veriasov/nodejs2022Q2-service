import { Injectable, NotFoundException } from '@nestjs/common';
import { Album } from 'src/dto/album.dto';
import { v4 as uuidv4 } from 'uuid';
import { UpdateAlbumDto } from 'src/dto/update.album.dto';
import { CreateAlbumDto } from 'src/dto/create.album.dto';

@Injectable()
export class AlbumsService {
  public albums: Array<Album> = [
    {
      id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      name: 'Innuendo',
      year: 1991,
      artistId: '3fa85f64-5717-4562-b3fc-2c963f66afa8',
    },
  ];

  public async findAll(): Promise<Array<Album>> {
    // console.log('album');
    return await this.albums;
  }

  public async findOne(id: string): Promise<Album> {
    const album: Album = await this.albums.find((album) => album.id === id);
    if (!album) {
      throw new NotFoundException(`album with id ${id} doesn't exist`);
    }
    return album;
  }

  public async create(newAlbum: CreateAlbumDto): Promise<Album> {
    const album = {
      id: uuidv4(),
      name: newAlbum.name,
      year: newAlbum.year,
      artistId: newAlbum.artistId,
    };
    // console.log('Create', album);
    await this.albums.push(album);
    // console.log('Create', this.albums);
    return album;
  }

  public async update(
    id: string,
    newAlbumData: UpdateAlbumDto,
  ): Promise<Album> {
    // console.log('Update', newAlbumData);
    // console.log('Update', id);
    const album: Album = await this.albums.find((album) => album.id === id);
    // console.log('Update', this.albums);
    if (!album) {
      throw new NotFoundException(`Album with id ${id} doesn't exist`);
    }
    const albumIndex = await this.albums.findIndex((album) => album.id === id);

    (await newAlbumData).name
      ? (this.albums[albumIndex].name = (await newAlbumData).name)
      : null;
    (await newAlbumData).year
      ? (this.albums[albumIndex].year = (await newAlbumData).year)
      : null;
    (await newAlbumData).artistId
      ? (this.albums[albumIndex].artistId = (await newAlbumData).artistId)
      : null;
    // console.log('After update', await this.albums[albumIndex]);
    return await this.albums[albumIndex];
  }

  public async delete(id: string): Promise<void> {
    const index: number = await this.albums.findIndex(
      (album) => album.id === id,
    );
    if (index === -1) {
      throw new NotFoundException('Album not found.');
    }
    await this.albums.splice(index, 1);
  }

  public async setNullArtistId(id: string): Promise<void> {
    await this.albums.forEach((album) => {
      album.artistId === id ? (album.artistId = null) : null;
    });
    // console.log(this.albums);
  }
}
