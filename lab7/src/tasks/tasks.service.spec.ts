import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';

describe('TasksService', () => {
  let service: TasksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TasksService],
    }).compile();

    service = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all tasks', () => {
    expect(service.findAll()).toHaveLength(3);
  });

  it('should filter tasks by status', () => {
    expect(service.findByStatus('pending')).toHaveLength(1);
  });

  it('should return one task', () => {
    expect(service.findOne('1')).toMatchObject({ id: '1' });
  });

  it('should return null for an unknown task', () => {
    expect(service.findOne('999')).toBeNull();
  });

  it('should create a task', () => {
    const task = service.create({
      title: 'New task',
      priority: 'medium',
    });

    expect(task.status).toBe('pending');
    expect(service.findAll()).toHaveLength(4);
  });

  it('should update a task', () => {
    const task = service.update('1', {
      status: 'done',
      priority: 'low',
    });

    expect(task).toMatchObject({ status: 'done', priority: 'low' });
  });

  it('should return null when updating an unknown task', () => {
    expect(service.update('999', { status: 'done' })).toBeNull();
  });

  it('should delete a task', () => {
    expect(service.remove('1')).toBe(true);
    expect(service.findOne('1')).toBeNull();
  });

  it('should return false when deleting an unknown task', () => {
    expect(service.remove('999')).toBe(false);
  });
});
