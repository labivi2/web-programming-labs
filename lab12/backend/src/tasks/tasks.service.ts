import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './create-task.dto';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly tasksRepository: Repository<Task>,
  ) {}

  findAll() {
    return this.tasksRepository.find({ order: { id: 'ASC' } });
  }

  create(createTaskDto: CreateTaskDto) {
    return this.tasksRepository.save(
      this.tasksRepository.create(createTaskDto),
    );
  }
}
