/*eslint-disable */

import { Test, TestingModule } from '@nestjs/testing';
import { RentsService } from './rents.service';
import { UserRepository } from '../users/repositories/user.repository';
import { MovieRepository } from '../movies/repositories/movie.repository';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Rent } from './entities/rent.entity';

describe('RentsService', () => {
  let service: RentsService;
  let userRepo;
  let movieRepo;
  let rentRepo;

  const mockUserRepo = () => ({});

  const mockMovieRepo = () => ({});

  const mockRentRepo = () => ({});

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RentsService,
        {
          provide: UserRepository,
          useFactory: mockUserRepo,
        },
        { provide: MovieRepository, useFactory: mockMovieRepo },
        { provide: getRepositoryToken(Rent), useFactory: mockRentRepo },
      ],
    }).compile();

    service = module.get<RentsService>(RentsService);
    userRepo = module.get<UserRepository>(UserRepository);
    movieRepo = module.get<MovieRepository>(MovieRepository);
    rentRepo = module.get(getRepositoryToken(Rent));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
