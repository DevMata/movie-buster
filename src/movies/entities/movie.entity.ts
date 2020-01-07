import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Tag } from 'src/tags/entities/tag.entity';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn('uuid')
  movieId: string;

  @Column({ length: 50 })
  title: string;

  @Column({ length: 500 })
  description: string;

  @Column()
  poster: string;

  @Column()
  trailer: string;

  @Column()
  rentPrince: number;

  @Column()
  salePrice: number;

  @Column({ type: 'integer' })
  stock: number;

  @Column({ type: 'integer' })
  likes: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  modifiedAt: Date;

  @ManyToMany(() => Tag)
  @JoinTable()
  tags: Tag[];
}
