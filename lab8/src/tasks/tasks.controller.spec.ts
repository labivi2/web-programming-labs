import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

describe('TasksController', () => {
  let controller: TasksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [TasksService],
    }).compile();

    controller = module.get<TasksController>(TasksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all tasks', () => {
    expect(controller.findAll()).toHaveLength(3);
  });

  it('should filter tasks by status', () => {
    expect(controller.findByStatus('pending')).toHaveLength(1);
  });

  it('should return one task', () => {
    expect(controller.findOne('1')).toMatchObject({ id: 1 });
  });

  it('should throw when a task is not found', () => {
    expect(() => controller.findOne('999')).toThrow(NotFoundException);
  });

  it('should create a task', () => {
    expect(
      controller.create({
        title: 'New task',
        priority: 'medium',
      }),
    ).toMatchObject({ status: 'pending' });
  });

  it('should update a task', () => {
    expect(controller.update('1', { status: 'done' })).toMatchObject({
      status: 'done',
    });
  });

  it('should throw when updating an unknown task', () => {
    expect(() => controller.update('999', { status: 'done' })).toThrow(
      NotFoundException,
    );
  });

  it('should delete a task', () => {
    expect(controller.remove('1')).toBeUndefined();
  });

  it('should throw when deleting an unknown task', () => {
    expect(() => controller.remove('999')).toThrow(NotFoundException);
  });
});
