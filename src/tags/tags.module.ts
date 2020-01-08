import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagRepository } from './repositories/tag.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TagRepository])],
  exports: [TypeOrmModule],
})
export class TagsModule {}
