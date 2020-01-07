import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
} from 'typeorm';
import { Movie } from 'src/movies/entities/movie.entity';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn('uuid')
  tagId: string;

  @Column()
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  modifiedAt: Date;

  @ManyToMany(
    () => Movie,
    movie => movie.tags,
  )
  movies: Movie[];
}
