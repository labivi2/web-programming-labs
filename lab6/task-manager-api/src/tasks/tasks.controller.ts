import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import type { Task } from './entities/task.entity';

@Controller('tasks')
export class TasksController {
  private tasks: Task[] = [
    {
      id: '1',
      title: 'Learn Nest.js',
      description: 'Study controllers and modules',
      status: 'pending',
      priority: 'high',
      createdAt: '2026-06-01T10:00:00.000Z',
    },
    {
      id: '2',
      title: 'Create API',
      description: 'Add task endpoints',
      status: 'in-progress',
      priority: 'medium',
      createdAt: '2026-06-02T10:00:00.000Z',
    },
    {
      id: '3',
      title: 'Test API',
      description: 'Check all endpoints',
      status: 'done',
      priority: 'low',
      createdAt: '2026-06-03T10:00:00.000Z',
    },
  ];

  @Get()
  findAll(): Task[] {
    return this.tasks;
  }

  @Get('search')
  findByStatus(@Query('status') status?: string): Task[] {
    if (!status) {
      return this.tasks;
    }

    return this.tasks.filter((task) => task.status === status);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Task | { message: string } {
    return (
      this.tasks.find((task) => task.id === id) ?? {
        message: 'Task not found',
      }
    );
  }

  @Post()
  create(@Body() dto: CreateTaskDto): Task {
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

  @Delete(':id')
  remove(@Param('id') id: string): { message: string } {
    const index = this.tasks.findIndex((task) => task.id === id);

    if (index === -1) {
      return { message: 'Task not found' };
    }

    this.tasks.splice(index, 1);
    return { message: 'Task deleted' };
  }
}
