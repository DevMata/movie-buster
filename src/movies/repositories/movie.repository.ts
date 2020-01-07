import { EntityRepository, Repository } from 'typeorm';
import { Movie } from '../entities/movie.entity';
import { CreateMovieDto } from '../dto/create-movie.dto';
import { ConflictException } from '@nestjs/common';

@EntityRepository(Movie)
export class MovieRepository extends Repository<Movie> {
  findMovieById(movieId: string): Promise<Movie> {
    return this.findOne(movieId);
  }

  findMovieByTitle(title: string): Promise<Movie> {
    return this.findOne({ title: title });
  }

  async createMovie(createMovieDto: CreateMovieDto): Promise<Movie> {
    const movie = await this.findMovieByTitle(createMovieDto.title);

    if (movie)
      throw new ConflictException('A movie with that title already exists');

    return this.save(createMovieDto);
  }
}