/*eslint-disable */

import { Test, TestingModule } from '@nestjs/testing';
import { OrdersService } from './orders.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { UserRepository } from '../users/repositories/user.repository';
import { MovieRepository } from '../movies/repositories/movie.repository';

describe('OrdersService', () => {
  let service: OrdersService;

  const mockUserRepo = () => ({});

  const mockOrderRepo = () => ({});

  const mockMovieRepo = () => ({});

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
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
