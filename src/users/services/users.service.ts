import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { HashHelper } from './hash.helper';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hashHelper: HashHelper,
  ) {}

  findAll(): Promise<Array<User>> {
    return this.userRepository.find();
  }

  findUserByEmail(email: string): Promise<User> {
    return this.userRepository.findUserByEmail(email);
  }

  findUserById(userId: string): Promise<User> {
    return this.userRepository.findUserById(userId);
  }

  createUser(createUserDto: CreateUserDto): Promise<User> {
    const { password } = createUserDto;
    createUserDto.password = this.hashHelper.hash(password);

    return this.userRepository.createUser(createUserDto);
  }

  updateUser(userId: string, updateUserDto: UpdateUserDto): Promise<User> {
    return this.userRepository.updateUser(userId, updateUserDto);
  }
}
