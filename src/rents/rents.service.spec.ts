/*eslint-disable */

import { Test, TestingModule } from '@nestjs/testing';
import { RentsService } from './rents.service';
import { UserRepository } from '../users/repositories/user.repository';
import { MovieRepository } from '../movies/repositories/movie.repository';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Rent } from './entities/rent.entity';
import { Repository } from 'typeorm';
import {
  NotFoundException,
  UnprocessableEntityException,
  MethodNotAllowedException,
} from '@nestjs/common';

describe('RentsService', () => {
  let service: RentsService;
  let userRepo: UserRepository;
  let movieRepo: MovieRepository;
  let rentRepo: Repository<any>;

  const mockRent = { rentedAt: 'today', rentId: '1' };

  const mockUserRepo = () => ({
    findOne: jest.fn(),
  });

  const mockMovieRepo = () => ({
    findOne: jest.fn(),
    save: jest.fn().mockResolvedValue('updated movie'),
    update: jest.fn(),
  });

  const mockRentRepo = () => ({
    save: jest.fn().mockResolvedValue(mockRent),
    findOne: jest.fn().mockResolvedValue({
      ...mockRent,
      status: 'pending',
      movie: { movieId: '1' },
    }),
    update: jest.fn(),
  });

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

  describe('rentMovie', () => {
    const mockUser = { name: 'name', lastname: 'last' };
    const mockMovie = { title: 'title', stock: '1' };

    it('success movie renting', async () => {
      (userRepo.findOne as jest.Mock).mockResolvedValue(mockUser);
      (movieRepo.findOne as jest.Mock).mockResolvedValue(mockMovie);

      expect(userRepo.findOne).not.toHaveBeenCalled();
      expect(movieRepo.findOne).not.toHaveBeenCalled();

      const rent = await service.rentMovie('1', '2');

      expect(userRepo.findOne).toHaveBeenCalledWith('1');
      expect(movieRepo.findOne).toHaveBeenCalledWith('2');
      expect(rent).toEqual(mockRent);
    });

    it('user not found', async () => {
      (userRepo.findOne as jest.Mock).mockResolvedValue(null);

      expect(service.rentMovie('1', '2')).rejects.toThrow(NotFoundException);
    });

    it('movie not found', async () => {
      (userRepo.findOne as jest.Mock).mockResolvedValue(mockUser);
      (movieRepo.findOne as jest.Mock).mockResolvedValue(null);

      expect(service.rentMovie('1', '2')).rejects.toThrow(NotFoundException);
    });

    it('movie sold out', async () => {
      (userRepo.findOne as jest.Mock).mockResolvedValue(mockUser);
      (movieRepo.findOne as jest.Mock).mockResolvedValue({ stock: 0 });

      expect(service.rentMovie('1', '2')).rejects.toThrow(
        UnprocessableEntityException,
      );
    });
  });

  describe('returnMovie', () => {
    it('success movie returning', async () => {
      (movieRepo.findOne as jest.Mock).mockResolvedValue({ stock: 0 });

      expect(rentRepo.findOne).not.toHaveBeenCalled();
      expect(movieRepo.update).not.toHaveBeenCalled();
      expect(rentRepo.update).not.toHaveBeenCalled();

      await service.returnMovie('1');

      expect(rentRepo.findOne).toHaveBeenCalledWith('1', {
        relations: ['movie'],
      });
    });

    it('rent not found', async () => {
      (rentRepo.findOne as jest.Mock).mockResolvedValue(null);

      expect(service.returnMovie('1')).rejects.toThrow(NotFoundException);
    });

    it('rent already returned', async () => {
      (rentRepo.findOne as jest.Mock).mockResolvedValue({ status: 'returned' });

      expect(service.returnMovie('1')).rejects.toThrow(
        MethodNotAllowedException,
      );
    });
  });
});
