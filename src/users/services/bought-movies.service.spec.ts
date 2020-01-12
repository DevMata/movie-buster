import { Test } from '@nestjs/testing';
import { BoughtMoviesService } from './bought-movies.service';
import { UserRepository } from '../repositories/user.repository';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Order } from '../../orders/entities/order.entity';

/*eslint-disable*/

describe('Bought movies service test', () => {
  let orderRepository;
  let userRepository;
  let boughtMoviesService;

  const mockOrderRepo = () => {};

  const mockUserRepo = () => {};

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        BoughtMoviesService,
        {
          provide: UserRepository,
          useFactory: mockUserRepo,
        },
        {
          provide: getRepositoryToken(Order),
          useFactory: mockOrderRepo,
        },
      ],
    }).compile();

    userRepository = await module.get<UserRepository>(UserRepository);
    boughtMoviesService = await module.get<BoughtMoviesService>(
      BoughtMoviesService,
    );
  });

  describe('service defined', () => {
    it('defined service', () => {
      expect(boughtMoviesService).toBeDefined();
    });
  });
});
