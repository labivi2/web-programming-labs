import { getRepositoryToken } from '@nestjs/typeorm';
import { Test } from '@nestjs/testing';
import type { Repository } from 'typeorm';
import { Tag } from '../tags/tag.entity';
import { Task } from './entities/task.entity';
import { TasksService } from './tasks.service';

describe('TasksService', () => {
  let service: TasksService;
  let tasksRepository: jest.Mocked<Repository<Task>>;
  let tagsRepository: jest.Mocked<Repository<Tag>>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: getRepositoryToken(Task),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            delete: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(Tag),
          useValue: {
            findBy: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get(TasksService);
    tasksRepository = module.get(getRepositoryToken(Task));
    tagsRepository = module.get(getRepositoryToken(Tag));
  });

  it('should return tasks with tags', async () => {
    tasksRepository.find.mockResolvedValue([]);

    await service.findAll();

    expect(tasksRepository.find).toHaveBeenCalledWith({
      relations: { tags: true },
    });
  });

  it('should find one task with tags', async () => {
    tasksRepository.findOne.mockResolvedValue(null);

    await service.findOne(1);

    expect(tasksRepository.findOne).toHaveBeenCalledWith({
      where: { id: 1 },
      relations: { tags: true },
    });
  });

  it('should create a task with tags', async () => {
    const tags = [{ id: 1, name: 'api', tasks: [] }] as Tag[];
    const task = { id: 1, title: 'Task', tags } as Task;
    tagsRepository.findBy.mockResolvedValue(tags);
    tasksRepository.create.mockReturnValue(task);
    tasksRepository.save.mockResolvedValue(task);
    tasksRepository.findOne.mockResolvedValue(task);

    const result = await service.create({
      title: 'Task',
      priority: 'high',
      tagIds: [1],
    });

    expect(result).toBe(task);
    expect(tagsRepository.findBy).toHaveBeenCalled();
  });

  it('should return null when updating an unknown task', async () => {
    tasksRepository.findOne.mockResolvedValue(null);

    await expect(service.update(999, { status: 'done' })).resolves.toBeNull();
  });

  it('should return delete result', async () => {
    tasksRepository.delete.mockResolvedValue({ affected: 1, raw: {} });

    await expect(service.remove(1)).resolves.toBe(true);
  });
});
