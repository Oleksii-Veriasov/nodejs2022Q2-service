import { AlbumEntity } from '../../albums/entities/album.entity';
import { ArtistEntity } from '../../artists/entities/artist.entity';
import { TrackEntity } from '../../tracks/entities/track.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('favorite')
export class FavoriteEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // @Column('simple-array')
  // tracks: string[];

  // @Column('simple-array')
  // artists: string[];

  // @Column('simple-array')
  // albums: string[];

  @ManyToMany(() => AlbumEntity, (album: any) => album, { cascade: true })
  @JoinTable({ name: 'favorites_album' })
  albums: AlbumEntity[];

  @ManyToMany(() => ArtistEntity, (artist: any) => artist, { cascade: true })
  @JoinTable({ name: 'favorites_artist' })
  artists: AlbumEntity[];

  @ManyToMany(() => TrackEntity, (track: any) => track, { cascade: true })
  @JoinTable({ name: 'favorites_track' })
  tracks: TrackEntity[];
}
