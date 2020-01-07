import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieRepository } from './repositories/movie.repository';

@Module({
  imports: [TypeOrmModule.forFeature([MovieRepository])],
})
export class MoviesModule {}
