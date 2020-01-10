import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './repositories/user.repository';
import { UsersService } from './services/users.service';
import { HashHelper } from './services/hash.helper';
import { UsersController } from './users.controller';
import { RolesModule } from 'src/roles/roles.module';
import { AuthenticationModule } from 'src/authentication/authentication.module';
import { RentedMoviesService } from './services/rented-movies.service';
import { Rent } from 'src/rents/entities/rent.entity';
import { LikedMoviesService } from './services/liked-movies.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository, Rent]),
    RolesModule,
    forwardRef(() => AuthenticationModule),
  ],
  providers: [
    UsersService,
    HashHelper,
    RentedMoviesService,
    LikedMoviesService,
  ],
  exports: [UsersService, TypeOrmModule, HashHelper, AuthenticationModule],
  controllers: [UsersController],
})
export class UsersModule {}
