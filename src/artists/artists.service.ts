import { Injectable, NotFoundException } from '@nestjs/common';
import { ArtistDto } from './dto/artist.dto';
import { v4 as uuidv4 } from 'uuid';
import { UpdateArtistDto } from './dto/update.artist.dto';
import { CreateArtistDto } from 'src/dto/create.artist.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ArtistEntity } from './entities/artist.entity';

@Injectable()
export class ArtistsService {
  constructor(
    @InjectRepository(ArtistEntity)
    private artistRepository: Repository<ArtistEntity>,
  ) {}

  public async findAll() {
    return await this.artistRepository.find();
  }

  public async findOne(artistId: string) {
    const artist = await this.artistRepository.find({
      where: { id: artistId },
    });
    if (artist) return artist;
    throw new NotFoundException(`Artist with id ${artistId} doesn't exist`);
  }

  public async create(newArtist: CreateArtistDto) {
    const artist = {
      id: uuidv4(),
      name: newArtist.name,
      grammy: newArtist.grammy,
    };
    return await this.artistRepository.create(artist);
  }

  public async update(artistId: string, newArtistData: UpdateArtistDto) {
    const updatedArtist = await this.artistRepository.findOne({
      where: { id: artistId },
    });
    if (!updatedArtist) {
      throw new NotFoundException(`Artist with id ${artistId} doesn't exist`);
    }
    Object.assign(updatedArtist, newArtistData);
    return await this.artistRepository.save(updatedArtist);
  }

  public async delete(artistId: string) {
    const result = await this.artistRepository.delete(artistId);
    if (result.affected === 0) {
      throw new NotFoundException(`Artist with id ${artistId} was not found`);
    }
  }
}
