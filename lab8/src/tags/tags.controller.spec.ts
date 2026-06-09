import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { Tag } from './tag.entity';
import { TagsController } from './tags.controller';
import { TagsService } from './tags.service';

describe('TagsController', () => {
  let controller: TagsController;
  let service: jest.Mocked<TagsService>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [TagsController],
      providers: [
        {
          provide: TagsService,
          useValue: {
            findAll: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get(TagsController);
    service = module.get(TagsService);
  });

  it('should return all tags', async () => {
    service.findAll.mockResolvedValue([]);

    await expect(controller.findAll()).resolves.toEqual([]);
  });

  it('should return one tag', async () => {
    const tag = { id: 1, name: 'backend' } as Tag;
    service.findOne.mockResolvedValue(tag);

    await expect(controller.findOne(1)).resolves.toBe(tag);
  });

  it('should throw when a tag is not found', async () => {
    service.findOne.mockResolvedValue(null);

    await expect(controller.findOne(999)).rejects.toThrow(NotFoundException);
  });

  it('should throw when deleting an unknown tag', async () => {
    service.remove.mockResolvedValue(false);

    await expect(controller.remove(999)).rejects.toThrow(NotFoundException);
  });
});
