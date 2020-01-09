import { EntityRepository, Repository } from 'typeorm';
import { Movie } from '../entities/movie.entity';
import { UpdateMovieDto } from '../dto/update-movie.dto';
import { NotFoundException } from '@nestjs/common';

@EntityRepository(Movie)
export class MovieRepository extends Repository<Movie> {
  getMovies(): Promise<Array<Movie>> {
    return this.find({
      select: ['movieId', 'title', 'description', 'stock', 'likes'],
    });
  }

  findMovieById(movieId: string): Promise<Movie> {
    return this.findOne(movieId);
  }

  findMovieByTitle(title: string): Promise<Movie> {
    return this.findOne({ title: title });
  }

  async updateMovie(
    movieId: string,
    updateMovieDto: UpdateMovieDto,
  ): Promise<Movie> {
    const movie = await this.findOne(movieId);
    if (!movie) throw new NotFoundException('movie not found');

    return this.save({ ...movie, ...updateMovieDto });
  }
}
