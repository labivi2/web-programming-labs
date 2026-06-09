import type { Task } from '../types/task'

export const INITIAL_TASKS: Task[] = [
  {
    id: '1',
    title: 'Create project structure',
    description: 'Add folders and base files',
    status: 'done',
    priority: 'high',
    createdAt: new Date('2026-05-20'),
  },
  {
    id: '2',
    title: 'Configure routing',
    description: 'Add pages and navigation',
    status: 'in-progress',
    priority: 'high',
    createdAt: new Date('2026-05-22'),
  },
  {
    id: '3',
    title: 'Create task form',
    description: 'Add form for new tasks',
    status: 'todo',
    priority: 'medium',
    createdAt: new Date('2026-05-24'),
  },
  {
    id: '4',
    title: 'Test application',
    description: 'Check navigation and task actions',
    status: 'todo',
    priority: 'low',
    createdAt: new Date('2026-05-26'),
  },
]
