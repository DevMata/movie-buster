import { EntityRepository, Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { ConflictException } from '@nestjs/common';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  findUserById(userId: string): Promise<User> {
    return this.findOne(userId);
  }

  findUserByEmail(email: string): Promise<User> {
    return this.findOne({ email: email });
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.findUserByEmail(createUserDto.email);
    if (user)
      throw new ConflictException('provided email is already registered');

    return this.save(createUserDto);
  }
}
