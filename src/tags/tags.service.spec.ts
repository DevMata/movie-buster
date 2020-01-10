/* eslint-disable */

import { Test } from '@nestjs/testing';
import { TagsService } from './tags.service';
import { TagRepository } from './repositories/tag.repository';
import { CreateTagDto } from './dto/create-tag.dto';

const mocktagdto: CreateTagDto = { name: 'something' };

const mockTagRepository = () => ({
  getTags: jest.fn(),
  findTagById: jest.fn(),
  findTagByName: jest.fn(),
  createTag: jest.fn(),
  createMultipleTags: jest.fn(),
});

describe('TagsService', () => {
  let tagsService: TagsService;
  let tagRepository: TagRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        TagsService,
        { provide: TagRepository, useFactory: mockTagRepository },
      ],
    }).compile();

    tagsService = await module.get(TagsService);
    tagRepository = await module.get(TagRepository);
  });

  describe('getTags', () => {
    it('gets all tags from repo', () => {
      expect(tagRepository.getTags).not.toHaveBeenCalled();

      tagRepository.getTags();

      expect(tagRepository.getTags).toHaveBeenCalled();
    });
  });

  describe('findTagById', () => {
    it('gets specific tag from repo', () => {
      expect(tagRepository.findTagById).not.toHaveBeenCalled();

      tagRepository.findTagById('asasa');

      expect(tagRepository.findTagById).toHaveBeenCalled();
    });
  });

  describe('findTagByName', () => {
    it('gets specific tag from repo', () => {
      expect(tagRepository.findTagByName).not.toHaveBeenCalled();

      tagRepository.findTagByName('asasa');

      expect(tagRepository.findTagByName).toHaveBeenCalled();
    });
  });

  describe('create tag', () => {
    it('create a tag', () => {
      expect(tagRepository.createTag).not.toHaveBeenCalled();

      tagRepository.createTag(mocktagdto);

      expect(tagRepository.createTag).toHaveBeenCalled();
    });
  });

  describe('create multiple tags', () => {
    it('create multiple tags', () => {
      expect(tagRepository.createMultipleTags).not.toHaveBeenCalled();

      tagRepository.createMultipleTags(['horror', 'scifi']);

      expect(tagRepository.createMultipleTags).toHaveBeenCalled();
    });
  });
});
