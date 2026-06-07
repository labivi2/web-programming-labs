import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';

describe('TasksController', () => {
  let controller: TasksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
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
    expect(controller.findOne('1')).toMatchObject({ id: '1' });
  });

  it('should return a message for an unknown task', () => {
    expect(controller.findOne('999')).toEqual({ message: 'Task not found' });
  });

  it('should create a task', () => {
    const task = controller.create({
      title: 'New task',
      priority: 'medium',
    });

    expect(task.status).toBe('pending');
    expect(controller.findAll()).toHaveLength(4);
  });

  it('should delete a task', () => {
    expect(controller.remove('1')).toEqual({ message: 'Task deleted' });
    expect(controller.findOne('1')).toEqual({ message: 'Task not found' });
  });
});
