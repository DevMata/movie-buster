import { EntityRepository, Repository } from 'typeorm';
import { Tag } from '../entities/tag.entity';
import { CreateTagDto } from '../dto/create-tag.dto';

@EntityRepository(Tag)
export class TagRepository extends Repository<Tag> {
  findTagById(tagId: string): Promise<Tag> {
    return this.findOne(tagId);
  }

  findTagByName(tagName: string): Promise<Tag> {
    return this.findOne({ name: tagName });
  }

  async createTag(createTagDto: CreateTagDto): Promise<Tag> {
    const { name } = createTagDto;
    createTagDto.name = name.toLowerCase();

    const tag = await this.findTagByName(createTagDto.name);
    if (tag) return tag;

    return this.save(createTagDto);
  }
}