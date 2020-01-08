import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieRepository } from './repositories/movie.repository';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { TagsModule } from 'src/tags/tags.module';

@Module({
  imports: [TypeOrmModule.forFeature([MovieRepository]), TagsModule],
  providers: [MoviesService],
  controllers: [MoviesController],
})
export class MoviesModule {}
