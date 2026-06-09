import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Tag } from '../../tags/tag.entity';

export type TaskStatus = 'pending' | 'in-progress' | 'done';
export type TaskPriority = 'low' | 'medium' | 'high';

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 100 })
  title!: string;

  @Column({ type: 'text', nullable: true })
  description!: string | null;

  @Column({ length: 20, default: 'pending' })
  status!: TaskStatus;

  @Column({ length: 10, default: 'medium' })
  priority!: TaskPriority;

  @CreateDateColumn()
  createdAt!: Date;

  @ManyToMany(() => Tag, (tag) => tag.tasks, { onDelete: 'CASCADE' })
  @JoinTable({
    name: 'task_tags',
    joinColumn: { name: 'taskId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'tagId', referencedColumnName: 'id' },
  })
  tags!: Tag[];
}
