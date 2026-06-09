import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Tag } from '../tags/tag.entity';
import type { CreateTaskDto } from './dto/create-task.dto';
import type { UpdateTaskDto } from './dto/update-task.dto';
import { Task, type TaskStatus } from './entities/task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly tasksRepository: Repository<Task>,
    @InjectRepository(Tag)
    private readonly tagsRepository: Repository<Tag>,
  ) {}

  findAll(): Promise<Task[]> {
    return this.tasksRepository.find({ relations: { tags: true } });
  }

  findByStatus(status?: string): Promise<Task[]> {
    return this.tasksRepository.find({
      where: status ? { status: status as TaskStatus } : {},
      relations: { tags: true },
    });
  }

  findOne(id: string | number): Promise<Task | null> {
    return this.tasksRepository.findOne({
      where: { id: Number(id) },
      relations: { tags: true },
    });
  }

  async create(dto: CreateTaskDto): Promise<Task> {
    const { tagIds, ...values } = dto;
    const tags = tagIds?.length
      ? await this.tagsRepository.findBy({ id: In(tagIds) })
      : [];
    const task = this.tasksRepository.create({
      ...values,
      description: values.description ?? null,
      tags,
    });
    const saved = await this.tasksRepository.save(task);

    return (await this.findOne(saved.id)) as Task;
  }

  async update(
    id: string | number,
    dto: UpdateTaskDto,
  ): Promise<Task | null> {
    const task = await this.findOne(id);

    if (!task) {
      return null;
    }

    const { tagIds, ...values } = dto;
    Object.assign(task, values);

    if (tagIds) {
      task.tags = await this.tagsRepository.findBy({ id: In(tagIds) });
    }

    await this.tasksRepository.save(task);
    return this.findOne(task.id);
  }

  async remove(id: string | number): Promise<boolean> {
    const result = await this.tasksRepository.delete(Number(id));
    return Boolean(result.affected);
  }
}
