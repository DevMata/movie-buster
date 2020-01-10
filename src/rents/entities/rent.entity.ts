import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Movie } from 'src/movies/entities/movie.entity';

@Entity()
export class Rent {
  @PrimaryGeneratedColumn('uuid')
  rentId: string;

  @CreateDateColumn()
  rentedAt: Date;

  @ManyToOne(
    () => User,
    user => user.rents,
  )
  user!: User;

  @ManyToOne(
    () => Movie,
    movie => movie.rents,
  )
  movie!: Movie;
}
