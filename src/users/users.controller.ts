import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UserIdDto } from './dto/user-id.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.createUser(createUserDto);
  }

  @Get()
  getUsers(): Promise<Array<User>> {
    return this.usersService.findAll();
  }

  @Get(':userId')
  getUser(@Param() userIdDto: UserIdDto): Promise<User> {
    return this.usersService.findUserById(userIdDto.userId);
  }
}
