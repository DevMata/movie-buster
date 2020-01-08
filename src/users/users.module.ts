import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './repositories/user.repository';
import { UsersService } from './users.service';
import { HashHelper } from './services/hash.helper';
import { UsersController } from './users.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository])],
  providers: [UsersService, HashHelper],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
