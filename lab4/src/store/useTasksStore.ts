import { create } from 'zustand'
import { INITIAL_TASKS } from '../data/initialTasks'
import type { Task } from '../types/task'

interface TasksStore {
  tasks: Task[]
  addTask: (task: Task) => void
  deleteTask: (id: string) => void
  updateTask: (task: Task) => void
}

export const useTasksStore = create<TasksStore>((set) => ({
  tasks: INITIAL_TASKS,
  addTask: (task) =>
    set((state) => ({
      tasks: [...state.tasks, task],
    })),
  deleteTask: (id) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
    })),
  updateTask: (updatedTask) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === updatedTask.id ? updatedTask : task,
      ),
    })),
}))
