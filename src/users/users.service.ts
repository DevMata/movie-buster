import { Injectable } from '@nestjs/common';
import { UserRepository } from './repositories/user.repository';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  findUserByEmail(email: string): Promise<User> {
    return this.userRepository.findUserByEmail(email);
  }

  findUserById(userId: string): Promise<User> {
    return this.userRepository.findUserById(userId);
  }
}
