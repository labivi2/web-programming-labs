import { Injectable } from '@nestjs/common';
import type { CreateTaskDto } from './dto/create-task.dto';
import type { UpdateTaskDto } from './dto/update-task.dto';
import type { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
  private tasks: Task[] = [
    {
      id: 1,
      title: 'Learn Nest.js',
      description: 'Study services and dependency injection',
      status: 'pending',
      priority: 'high',
      createdAt: new Date('2026-06-01T10:00:00.000Z'),
      tags: [],
    },
    {
      id: 2,
      title: 'Create CRUD API',
      description: 'Add all task operations',
      status: 'in-progress',
      priority: 'medium',
      createdAt: new Date('2026-06-02T10:00:00.000Z'),
      tags: [],
    },
    {
      id: 3,
      title: 'Test validation',
      description: 'Check invalid requests',
      status: 'done',
      priority: 'low',
      createdAt: new Date('2026-06-03T10:00:00.000Z'),
      tags: [],
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

  findOne(id: string | number): Task | null {
    return this.tasks.find((task) => task.id === Number(id)) ?? null;
  }

  create(dto: CreateTaskDto): Task {
    const task: Task = {
      id: Date.now(),
      title: dto.title,
      description: dto.description ?? '',
      status: 'pending',
      priority: dto.priority,
      createdAt: new Date(),
      tags: [],
    };

    this.tasks.push(task);
    return task;
  }

  update(id: string | number, dto: UpdateTaskDto): Task | null {
    const task = this.findOne(id);

    if (!task) {
      return null;
    }

    const { tagIds, ...values } = dto;

    for (const [key, value] of Object.entries(values)) {
      if (value !== undefined) {
        Object.assign(task, { [key]: value });
      }
    }

    return task;
  }

  remove(id: string | number): boolean {
    const index = this.tasks.findIndex((task) => task.id === Number(id));

    if (index === -1) {
      return false;
    }

    this.tasks.splice(index, 1);
    return true;
  }
}
