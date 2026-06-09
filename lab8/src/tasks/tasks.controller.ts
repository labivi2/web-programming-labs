import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import type { Task } from './entities/task.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  findAll(): Promise<Task[]> {
    return this.tasksService.findAll();
  }

  @Get('search')
  findByStatus(@Query('status') status?: string): Promise<Task[]> {
    return this.tasksService.findByStatus(status);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Task> {
    const task = await this.tasksService.findOne(id);

    if (!task) {
      throw new NotFoundException(`Завдання #${id} не знайдено`);
    }

    return task;
  }

  @Post()
  @HttpCode(201)
  create(@Body() dto: CreateTaskDto): Promise<Task> {
    return this.tasksService.create(dto);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateTaskDto,
  ): Promise<Task> {
    const task = await this.tasksService.update(id, dto);

    if (!task) {
      throw new NotFoundException(`Завдання #${id} не знайдено`);
    }

    return task;
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string): Promise<void> {
    const removed = await this.tasksService.remove(id);

    if (!removed) {
      throw new NotFoundException(`Завдання #${id} не знайдено`);
    }
  }
}
