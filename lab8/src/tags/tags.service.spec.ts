import { getRepositoryToken } from '@nestjs/typeorm';
import { Test } from '@nestjs/testing';
import type { Repository } from 'typeorm';
import { Tag } from './tag.entity';
import { TagsService } from './tags.service';

describe('TagsService', () => {
  let service: TagsService;
  let repository: jest.Mocked<Repository<Tag>>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        TagsService,
        {
          provide: getRepositoryToken(Tag),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get(TagsService);
    repository = module.get(getRepositoryToken(Tag));
  });

  it('should return all tags', async () => {
    repository.find.mockResolvedValue([]);

    await expect(service.findAll()).resolves.toEqual([]);
  });

  it('should create a tag', async () => {
    const tag = { id: 1, name: 'backend' } as Tag;
    repository.create.mockReturnValue(tag);
    repository.save.mockResolvedValue(tag);

    await expect(service.create({ name: 'backend' })).resolves.toBe(tag);
  });

  it('should return null when updating an unknown tag', async () => {
    repository.findOne.mockResolvedValue(null);

    await expect(service.update(999, { name: 'api' })).resolves.toBeNull();
  });

  it('should return delete result', async () => {
    repository.delete.mockResolvedValue({ affected: 1, raw: {} });

    await expect(service.remove(1)).resolves.toBe(true);
  });
});
