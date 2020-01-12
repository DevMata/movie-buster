/*eslint-disable */

import { Test } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { TagsService } from '../tags/tags.service';
import { MovieRepository } from './repositories/movie.repository';
import { UserRepository } from '../users/repositories/user.repository';

describe('movies service', () => {
  let service: MoviesService;
  let tagsService: TagsService;
  let movieRepo: MovieRepository;
  let userRepo: UserRepository;

  const mockTagService = () => ({
    createTags: jest.fn().mockResolvedValue('tags'),
  });

  const mockMovieRepo = () => ({
    getMovies: jest.fn().mockResolvedValue('some movies'),
    findMovieById: jest.fn().mockResolvedValue('some movie'),
    findMovieByTitle: jest.fn().mockResolvedValue('some movie'),
    save: jest.fn().mockResolvedValue('new movie'),
  });

  const mockUserRepo = () => ({});

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        MoviesService,
        { provide: TagsService, useFactory: mockTagService },
        { provide: MovieRepository, useFactory: mockMovieRepo },
        { provide: UserRepository, useFactory: mockUserRepo },
      ],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
    tagsService = module.get<TagsService>(TagsService);
    movieRepo = module.get<MovieRepository>(MovieRepository);
    userRepo = module.get<UserRepository>(UserRepository);
  });

  it('service is defined', () => {
    expect(service).toBeDefined();
  });

  describe('getMovies', () => {
    it('retuning movies', async () => {
      expect(movieRepo.getMovies).not.toHaveBeenCalled();

      const movies = await service.getMovies();

      expect(movies).toEqual('some movies');
    });
  });

  describe('getMovie', () => {
    it('returning movie', async () => {
      expect(movieRepo.findMovieById).not.toHaveBeenCalled();

      const movie = await service.getMovie('1');

      expect(movie).toEqual('some movie');
      expect(movieRepo.findMovieById).toHaveBeenCalledWith('1');
    });
  });

  describe('createMovie', () => {
    const mockMovieDto = {
      title: 'title',
      description: 'description',
      poster: 'poster',
      trailer: 'trailer',
      rentPrice: 1,
      salePrice: 1,
      stock: 1,
      tags: ['tag'],
    };

    it('creating a movie', async () => {
      expect(movieRepo.findMovieByTitle).not.toHaveBeenCalled();
      expect(tagsService.createTags).not.toHaveBeenCalled();

      const newMovie = await service.createMovie(mockMovieDto);

      expect(movieRepo.findMovieByTitle).toHaveBeenCalledWith(
        mockMovieDto.title,
      );
      expect(tagsService.createTags).toHaveBeenCalledWith({
        tags: mockMovieDto.tags,
      });
      expect(movieRepo.save).toHaveBeenCalledWith({
        ...mockMovieDto,
        tags: 'tags',
      });
    });
  });
});
