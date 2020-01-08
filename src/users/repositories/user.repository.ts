import { EntityRepository, Repository, UpdateResult } from 'typeorm';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { HashHelper } from '../services/hash.helper';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  constructor(private readonly hashHelper: HashHelper) {
    super();
  }

  async findUserById(userId: string): Promise<User> {
    const user = await this.findOne(userId, {
      select: ['name', 'lastname', 'email', 'createdAt', 'updatedAt'],
    });

    if (!user) throw new NotFoundException('user not found');

    return user;
  }

  findUserByEmail(email: string): Promise<User> {
    return this.findOne({ email: email });
  }

  getUsers(): Promise<Array<User>> {
    return this.find({
      select: ['name', 'lastname', 'email', 'createdAt', 'updatedAt'],
    });
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.findUserByEmail(createUserDto.email);
    if (user)
      throw new ConflictException('provided email is already registered');

    const { password } = createUserDto;
    createUserDto.password = this.hashHelper.hash(password);

    return this.save(createUserDto);
  }

  async changeUserPassword(
    userId: string,
    newPassword: string,
  ): Promise<UpdateResult> {
    await this.findUserById(userId);

    return this.update(userId, { password: this.hashHelper.hash(newPassword) });
  }
}
