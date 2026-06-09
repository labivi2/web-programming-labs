import {
  IsArray,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class UpdateTaskDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: 'Назва не може бути порожньою' })
  @MaxLength(100)
  title?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  description?: string;

  @IsOptional()
  @IsIn(['pending', 'in-progress', 'done'])
  status?: 'pending' | 'in-progress' | 'done';

  @IsOptional()
  @IsIn(['low', 'medium', 'high'], {
    message: 'Пріоритет має бути: low, medium або high',
  })
  priority?: 'low' | 'medium' | 'high';

  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  tagIds?: number[];
}
