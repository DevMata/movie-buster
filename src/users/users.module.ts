import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './repositories/user.repository';
import { UsersService } from './services/users.service';
import { HashHelper } from './services/hash.helper';
import { UsersController } from './users.controller';
import { RolesModule } from 'src/roles/roles.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository]), RolesModule],
  providers: [UsersService, HashHelper],
  exports: [UsersService, TypeOrmModule, HashHelper],
  controllers: [UsersController],
})
export class UsersModule {}
