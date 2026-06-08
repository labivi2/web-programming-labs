import { Injectable } from '@nestjs/common';
import type { CreateTaskDto } from './dto/create-task.dto';
import type { UpdateTaskDto } from './dto/update-task.dto';
import type { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
  private tasks: Task[] = [
    {
      id: '1',
      title: 'Learn Nest.js',
      description: 'Study services and dependency injection',
      status: 'pending',
      priority: 'high',
      createdAt: '2026-06-01T10:00:00.000Z',
    },
    {
      id: '2',
      title: 'Create CRUD API',
      description: 'Add all task operations',
      status: 'in-progress',
      priority: 'medium',
      createdAt: '2026-06-02T10:00:00.000Z',
    },
    {
      id: '3',
      title: 'Test validation',
      description: 'Check invalid requests',
      status: 'done',
      priority: 'low',
      createdAt: '2026-06-03T10:00:00.000Z',
    },
  ];

  findAll(): Task[] {
    return this.tasks;
  }

  findByStatus(status?: string): Task[] {
    if (!status) {
      return this.tasks;
    }

    return this.tasks.filter((task) => task.status === status);
  }

  findOne(id: string): Task | null {
    return this.tasks.find((task) => task.id === id) ?? null;
  }

  create(dto: CreateTaskDto): Task {
    const task: Task = {
      id: Date.now().toString(),
      title: dto.title,
      description: dto.description ?? '',
      status: 'pending',
      priority: dto.priority,
      createdAt: new Date().toISOString(),
    };

    this.tasks.push(task);
    return task;
  }

  update(id: string, dto: UpdateTaskDto): Task | null {
    const task = this.findOne(id);

    if (!task) {
      return null;
    }

    Object.assign(task, dto);
    return task;
  }

  remove(id: string): boolean {
    const index = this.tasks.findIndex((task) => task.id === id);

    if (index === -1) {
      return false;
    }

    this.tasks.splice(index, 1);
    return true;
  }
}
