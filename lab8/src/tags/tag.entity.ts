import {
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Task } from '../tasks/entities/task.entity';

@Entity('tags')
export class Tag {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 50, unique: true })
  name!: string;

  @ManyToMany(() => Task, (task) => task.tags, { onDelete: 'CASCADE' })
  tasks!: Task[];
}
