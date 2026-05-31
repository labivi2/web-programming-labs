import type { CreateTodoDto, Todo, UpdateTodoDto } from '../types/todo'

const API_URL = 'http://localhost:3001'

async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${url}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  })

  if (!response.ok) {
    throw new Error('Помилка запиту до сервера')
  }

  return response.json()
}

export const todosApi = {
  getAll: () => request<Todo[]>('/todos'),

  create: (todo: CreateTodoDto) =>
    request<Todo>('/todos', {
      method: 'POST',
      body: JSON.stringify(todo),
    }),

  update: (id: number, todo: UpdateTodoDto) =>
    request<Todo>(`/todos/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(todo),
    }),

  remove: async (id: number) => {
    const response = await fetch(`${API_URL}/todos/${id}`, {
      method: 'DELETE',
    })

    if (!response.ok) {
      throw new Error('Помилка видалення завдання')
    }
  },
}
