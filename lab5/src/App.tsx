import { useState } from 'react'
import type { FormEvent } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { todosApi } from './api/todos'
import './App.css'

function App() {
  const [title, setTitle] = useState('')
  const queryClient = useQueryClient()

  const { data: todos = [], isLoading, isError, error } = useQuery({
    queryKey: ['todos'],
    queryFn: todosApi.getAll,
  })

  const refreshTodos = () => {
    queryClient.invalidateQueries({ queryKey: ['todos'] })
  }

  const createTodoMutation = useMutation({
    mutationFn: todosApi.create,
    onSuccess: () => {
      setTitle('')
      refreshTodos()
    },
  })

  const updateTodoMutation = useMutation({
    mutationFn: ({ id, completed }: { id: number; completed: boolean }) =>
      todosApi.update(id, { completed }),
    onSuccess: refreshTodos,
  })

  const deleteTodoMutation = useMutation({
    mutationFn: todosApi.remove,
    onSuccess: refreshTodos,
  })

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const trimmedTitle = title.trim()
    if (!trimmedTitle) {
      return
    }

    createTodoMutation.mutate({
      title: trimmedTitle,
      completed: false,
    })
  }

  return (
    <main className="app">
      <section className="app-header">
        <h1>Лабораторна робота №5</h1>
        <p>Інтеграція з API</p>
      </section>

      <section className="todo-section">
        <h2>Список завдань</h2>

        <form className="todo-form" onSubmit={handleSubmit}>
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Нове завдання"
          />
          <button type="submit" disabled={createTodoMutation.isPending}>
            {createTodoMutation.isPending ? 'Додавання...' : 'Додати'}
          </button>
        </form>

        {createTodoMutation.isError && (
          <p className="status error">Не вдалося додати завдання</p>
        )}

        {(updateTodoMutation.isError || deleteTodoMutation.isError) && (
          <p className="status error">Не вдалося оновити список</p>
        )}

        {isLoading && <p className="status">Завантаження...</p>}

        {isError && (
          <p className="status error">
            {error instanceof Error ? error.message : 'Не вдалося завантажити список'}
          </p>
        )}

        {!isLoading && !isError && (
          <ul className="todo-list">
            {todos.map((todo) => (
              <li key={todo.id} className="todo-item">
                <label className="todo-label">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    disabled={updateTodoMutation.isPending}
                    onChange={(event) =>
                      updateTodoMutation.mutate({
                        id: todo.id,
                        completed: event.target.checked,
                      })
                    }
                  />
                  <span className={todo.completed ? 'completed' : ''}>
                    {todo.title}
                  </span>
                </label>

                <button
                  type="button"
                  className="delete-button"
                  disabled={deleteTodoMutation.isPending}
                  onClick={() => deleteTodoMutation.mutate(todo.id)}
                >
                  Видалити
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  )
}

export default App
