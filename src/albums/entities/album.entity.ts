import { ArtistEntity } from '../../artists/entities/artist.entity';
import { TrackEntity } from '../../tracks/entities/track.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('album')
export class AlbumEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  year: number;

  @Column({ nullable: true })
  artistId: string;

  @ManyToOne(() => ArtistEntity, (artist) => artist.id, {
    nullable: true,
    onDelete: 'SET NULL',
    cascade: ['insert', 'update', 'remove'],
  })
  artist: Promise<ArtistEntity>;

  @OneToMany(() => TrackEntity, (track) => track.artistId)
  tracks: Promise<TrackEntity[]>;
}
