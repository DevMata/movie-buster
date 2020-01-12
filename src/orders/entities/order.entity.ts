import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Movie } from '../../movies/entities/movie.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  orderId: string;

  @CreateDateColumn()
  boughtAt: Date;

  @ManyToOne(
    () => User,
    user => user.orders,
  )
  user!: User;

  @ManyToOne(
    () => Movie,
    movie => movie.orders,
  )
  movie!: Movie;
}
