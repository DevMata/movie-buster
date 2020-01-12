/*eslint-disable */

import { Test, TestingModule } from '@nestjs/testing';
import { OrdersService } from './orders.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { UserRepository } from '../users/repositories/user.repository';
import { MovieRepository } from '../movies/repositories/movie.repository';
import {
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';

describe('OrdersService', () => {
  let service: OrdersService;
  let userRepo: UserRepository;
  let movieRepo: MovieRepository;

  const mockUserRepo = () => ({
    findOne: jest.fn(),
  });

  const mockUser = { name: 'name', lastname: 'lastname' };

  const mockOrderRepo = () => ({
    save: jest.fn().mockResolvedValue({ orderId: '1', boughtAt: '1' }),
  });

  const mockMovieRepo = () => ({
    save: jest.fn(),
    findOne: jest.fn(),
  });

  const mockMovie = { title: 'title', stock: 2 };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrdersService,
        { provide: UserRepository, useFactory: mockUserRepo },
        { provide: MovieRepository, useFactory: mockMovieRepo },
        { provide: getRepositoryToken(Order), useFactory: mockOrderRepo },
      ],
    }).compile();

    service = module.get<OrdersService>(OrdersService);
    userRepo = module.get(UserRepository);
    movieRepo = module.get(MovieRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('buyMovie with user repo and movie repo returning correct entities', async () => {
    (userRepo.findOne as jest.Mock).mockResolvedValue(mockUser);
    (movieRepo.findOne as jest.Mock).mockResolvedValue(mockMovie);

    expect(userRepo.findOne).not.toHaveBeenCalled();
    expect(movieRepo.findOne).not.toHaveBeenCalled();

    await service.buyMovie('1', '2');

    expect(userRepo.findOne).toHaveBeenCalledWith('1');
    expect(movieRepo.findOne).toHaveBeenCalledWith('2');
  });

  it('buyMovie with user repo rejecting', async () => {
    (userRepo.findOne as jest.Mock).mockResolvedValue(0);

    expect(userRepo.findOne).not.toHaveBeenCalled();
    expect(movieRepo.findOne).not.toHaveBeenCalled();

    expect(service.buyMovie('1', '2')).rejects.toThrow();
  });

  it('buyMovie with movie repo rejecting', async () => {
    (userRepo.findOne as jest.Mock).mockResolvedValue(mockUser);
    (movieRepo.findOne as jest.Mock).mockResolvedValue(null);

    expect(userRepo.findOne).not.toHaveBeenCalled();
    expect(movieRepo.findOne).not.toHaveBeenCalled();

    expect(service.buyMovie('1', '2')).rejects.toThrow();
  });

  it('buyMovie with movie without stock', async () => {
    (userRepo.findOne as jest.Mock).mockResolvedValue(mockUser);
    (movieRepo.findOne as jest.Mock).mockResolvedValue({ stock: 0 });

    expect(userRepo.findOne).not.toHaveBeenCalled();
    expect(movieRepo.findOne).not.toHaveBeenCalled();

    expect(service.buyMovie('1', '2')).rejects.toThrow(
      UnprocessableEntityException,
    );
  });
});
