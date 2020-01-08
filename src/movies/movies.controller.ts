import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from './entities/movie.entity';
import { MovieIdDto } from './dto/movie-id.dto';
import { CreateMovieDto } from './dto/create-movie.dto';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  getMovies(): Promise<Array<Movie>> {
    return this.moviesService.getMovies();
  }

  @Get(':movieId')
  getMovie(@Param() movieIdDto: MovieIdDto): Promise<Movie> {
    return this.moviesService.getMovie(movieIdDto.movieId);
  }

  @Post()
  createMovie(@Body() createMovieDto: CreateMovieDto): Promise<Movie> {
    return this.moviesService.createMovie(createMovieDto);
  }
}
