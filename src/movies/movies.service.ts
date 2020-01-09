import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie } from './entities/movie.entity';
import { MovieRepository } from './repositories/movie.repository';
import { CreateMovieDto } from './dto/create-movie.dto';
import { TagsService } from 'src/tags/tags.service';
import { Tag } from 'src/tags/entities/tag.entity';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { UserPayload } from 'src/authentication/dto/user-payload.dto';
import { UserRepository } from 'src/users/repositories/user.repository';

@Injectable()
export class MoviesService {
  constructor(
    private readonly movieRepository: MovieRepository,
    private readonly tagsService: TagsService,
    private readonly userRepository: UserRepository,
  ) {}

  getMovies(): Promise<Array<Movie>> {
    return this.movieRepository.getMovies();
  }

  getMovie(movieId: string): Promise<Movie> {
    return this.movieRepository.findMovieById(movieId);
  }

  async createMovie(createMovieDto: CreateMovieDto): Promise<Movie> {
    await this.movieRepository.findMovieByTitle(createMovieDto.title);

    let tags: Tag[] = [];
    if (createMovieDto.tags) {
      tags = await this.tagsService.createTags({ tags: createMovieDto.tags });
    }

    const movie = { ...createMovieDto, tags };

    return this.movieRepository.save(movie);
  }

  updateMovie(movieId: string, updateMovieDto: UpdateMovieDto): Promise<Movie> {
    return this.movieRepository.updateMovie(movieId, updateMovieDto);
  }

  async likeMovie(userPayload: UserPayload, movieId: string): Promise<void> {
    const movie = await this.movieRepository.findOne(movieId);
    if (!movie) throw new NotFoundException('movie not found');

    const numLikes = movie.likes;

    const user = await this.userRepository.findOne(userPayload.userId);
    const movies = user.movies;

    if (!movies.map(movie => movie.movieId).includes(movie.movieId)) {
      const updatedMovie = await this.movieRepository.save({
        ...movie,
        likes: numLikes + 1,
      });

      this.userRepository.save({
        ...user,
        movies: [...movies, updatedMovie],
      });
    }
  }
}
