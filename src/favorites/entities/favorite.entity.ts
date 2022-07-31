import { AlbumEntity } from '../../albums/entities/album.entity';
import { ArtistEntity } from '../../artists/entities/artist.entity';
import { TrackEntity } from '../../tracks/entities/track.entity';
import { Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('favorite')
export class FavoriteEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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
