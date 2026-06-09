import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { Tag } from './tag.entity';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagsRepository: Repository<Tag>,
  ) {}

  findAll(): Promise<Tag[]> {
    return this.tagsRepository.find();
  }

  findOne(id: number): Promise<Tag | null> {
    return this.tagsRepository.findOne({ where: { id } });
  }

  create(createTagDto: CreateTagDto): Promise<Tag> {
    const tag = this.tagsRepository.create(createTagDto);
    return this.tagsRepository.save(tag);
  }

  async update(id: number, updateTagDto: UpdateTagDto): Promise<Tag | null> {
    const tag = await this.findOne(id);

    if (!tag) {
      return null;
    }

    Object.assign(tag, updateTagDto);
    return this.tagsRepository.save(tag);
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.tagsRepository.delete(id);
    return Boolean(result.affected);
  }
}
