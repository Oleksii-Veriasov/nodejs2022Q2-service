import { Injectable, NotFoundException } from '@nestjs/common';
import { AlbumDto } from './dto/album.dto';
import { v4 as uuidv4 } from 'uuid';
import { UpdateAlbumDto } from 'src/albums/dto/update.album.dto';
import { CreateAlbumDto } from 'src/dto/create.album.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AlbumEntity } from './entities/album.entity';

@Injectable()
export class AlbumsService {
  constructor(
    @InjectRepository(AlbumEntity)
    private albumRepository: Repository<AlbumEntity>,
  ) {}

  public async findAll() {
    return await this.albumRepository.find();
  }

  public async findOne(albumId: string) {
    const album = await this.albumRepository.findOne({
      where: { id: albumId },
    });
    if (album) return album;
    throw new NotFoundException(`Album with id ${albumId} doesn't exist`);
  }

  public async create(newAlbum: CreateAlbumDto) {
    const album = {
      id: uuidv4(),
      name: newAlbum.name,
      year: newAlbum.year,
      artistId: newAlbum.artistId,
    };
    return await this.albumRepository.create(album);
  }

  public async update(albumId: string, newAlbumData: UpdateAlbumDto) {
    const updatedAlbum = await this.albumRepository.findOne({
      where: { id: albumId },
    });
    if (!updatedAlbum) {
      throw new NotFoundException(`Album with id ${albumId} doesn't exist`);
    }
    Object.assign(updatedAlbum, newAlbumData);
    return await this.albumRepository.save(updatedAlbum);
  }

  public async delete(albumId: string) {
    const result = await this.albumRepository.delete(albumId);
    if (result.affected === 0) {
      throw new NotFoundException(`Album with id ${albumId} was not found`);
    }
  }

  // public async setNullArtistId(id: string): Promise<void> {
  //   await this.albums.forEach((album) => {
  //     album.artistId === id ? (album.artistId = null) : null;
  //   });
  // }
}
