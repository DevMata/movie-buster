import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './services/users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UserIdDto } from './dto/user-id.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ChangeRoleDto } from './dto/change-role.dto';
import { AuthGuard } from '@nestjs/passport';
import { TokenGuard } from 'src/authentication/guards/token.guard';
import { RoleGuard } from 'src/authentication/guards/role.guard';
import { Roles } from 'src/authentication/decorators/role.decorator';

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

  @Put(':userId')
  updateUser(
    @Param() userIdDto: UserIdDto,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.updateUser(userIdDto.userId, updateUserDto);
  }

  @Put(':userId/changeRole')
  @Roles('admin')
  @UseGuards(AuthGuard('jwt'), TokenGuard, RoleGuard)
  changeRole(
    @Param() userIdDto: UserIdDto,
    @Body() changeRoleDto: ChangeRoleDto,
  ): Promise<User> {
    return this.usersService.changeRole(userIdDto.userId, changeRoleDto.role);
  }
}
