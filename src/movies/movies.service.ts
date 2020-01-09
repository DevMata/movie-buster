import { Injectable } from '@nestjs/common';
import { Movie } from './entities/movie.entity';
import { MovieRepository } from './repositories/movie.repository';
import { CreateMovieDto } from './dto/create-movie.dto';
import { TagsService } from 'src/tags/tags.service';
import { Tag } from 'src/tags/entities/tag.entity';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Injectable()
export class MoviesService {
  constructor(
    private readonly movieRepository: MovieRepository,
    private readonly tagsService: TagsService,
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
}
