import { Module, forwardRef } from '@nestjs/common';
import { RentsService } from './rents.service';
import { RentsController } from './rents.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rent } from './entities/rent.entity';
import { UsersModule } from 'src/users/users.module';
import { MoviesModule } from 'src/movies/movies.module';
import { AuthenticationModule } from 'src/authentication/authentication.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Rent]),
    forwardRef(() => UsersModule),
    MoviesModule,
    AuthenticationModule,
  ],
  providers: [RentsService],
  controllers: [RentsController],
})
export class RentsModule {}
