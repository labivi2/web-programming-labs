import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import type { Task } from './entities/task.entity';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

describe('TasksController', () => {
  let controller: TasksController;
  let service: jest.Mocked<TasksService>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [
        {
          provide: TasksService,
          useValue: {
            findAll: jest.fn(),
            findByStatus: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get(TasksController);
    service = module.get(TasksService);
  });

  it('should return all tasks', async () => {
    service.findAll.mockResolvedValue([]);

    await expect(controller.findAll()).resolves.toEqual([]);
  });

  it('should return one task', async () => {
    const task = { id: 1, title: 'Task' } as Task;
    service.findOne.mockResolvedValue(task);

    await expect(controller.findOne('1')).resolves.toBe(task);
  });

  it('should throw when a task is not found', async () => {
    service.findOne.mockResolvedValue(null);

    await expect(controller.findOne('999')).rejects.toThrow(NotFoundException);
  });

  it('should throw when deleting an unknown task', async () => {
    service.remove.mockResolvedValue(false);

    await expect(controller.remove('999')).rejects.toThrow(NotFoundException);
  });
});
