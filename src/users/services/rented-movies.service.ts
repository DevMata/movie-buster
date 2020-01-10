import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Rent } from 'src/rents/entities/rent.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RentedMoviesService {
  constructor(
    @InjectRepository(Rent) private readonly rentRepository: Repository<Rent>,
  ) {}
}
