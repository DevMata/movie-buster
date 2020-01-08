import { EntityRepository, Repository, In } from 'typeorm';
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

  async createMultipleTags(tags: Array<string>): Promise<Array<Tag>> {
    //get only unique keys in the array
    //serialize to lower case
    const filteredTags = new Set(tags.map(tag => tag.toLowerCase()));

    const existingTags = await this.find({ name: In([...filteredTags]) });

    const existingNames = existingTags.map(tag => tag.name);

    const notSaved = tags
      .filter(tag => !existingNames.includes(tag))
      .map(tag => ({ name: tag }));

    const newTags = await this.save(notSaved);

    return [...existingTags, ...newTags];
  }
}
