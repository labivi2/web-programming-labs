import { Injectable, NotFoundException } from '@nestjs/common';
import { Express } from 'express';
import { randomUUID } from 'crypto';
import { mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';
import { FileMetadata } from './file-metadata.interface';

const uploadDirectory = join(process.cwd(), 'uploads');
mkdirSync(uploadDirectory, { recursive: true });

@Injectable()
export class FilesService {
  private readonly files: FileMetadata[] = [];

  save(file: Express.Multer.File): FileMetadata {
    const extensions: Record<string, string> = {
      'image/jpeg': '.jpg',
      'image/png': '.png',
      'image/webp': '.webp',
    };
    const name = `${randomUUID()}${extensions[file.mimetype]}`;
    writeFileSync(join(uploadDirectory, name), file.buffer);

    const metadata = {
      name,
      originalName: file.originalname,
      size: file.size,
      mimetype: file.mimetype,
      url: `http://localhost:3000/files/${name}`,
    };

    this.files.push(metadata);
    return metadata;
  }

  findAll(): FileMetadata[] {
    return this.files;
  }

  findOne(name: string): FileMetadata {
    const file = this.files.find((item) => item.name === name);

    if (!file) {
      throw new NotFoundException('Файл не знайдено');
    }

    return file;
  }

  getPath(name: string): string {
    return join(uploadDirectory, this.findOne(name).name);
  }
}
