import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('favorite')
export class FavoriteEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('simple-array')
  tracks: string[];

  @Column('simple-array')
  artists: string[];

  @Column('simple-array')
  albums: string[];
}
