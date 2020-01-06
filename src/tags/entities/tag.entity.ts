import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn('uuid')
  tagId: string;

  @Column()
  name: string;
}
