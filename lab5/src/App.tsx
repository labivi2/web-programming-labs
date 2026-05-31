import { useQuery } from '@tanstack/react-query'
import { todosApi } from './api/todos'
import './App.css'

function App() {
  const { data: todos = [], isLoading, isError, error } = useQuery({
    queryKey: ['todos'],
    queryFn: todosApi.getAll,
  })

  return (
    <main className="app">
      <section className="app-header">
        <h1>{'\u041b\u0430\u0431\u043e\u0440\u0430\u0442\u043e\u0440\u043d\u0430 \u0440\u043e\u0431\u043e\u0442\u0430 \u21165'}</h1>
        <p>{'\u0406\u043d\u0442\u0435\u0433\u0440\u0430\u0446\u0456\u044f \u0437 API'}</p>
      </section>

      <section className="todo-section">
        <h2>{'\u0421\u043f\u0438\u0441\u043e\u043a \u0437\u0430\u0432\u0434\u0430\u043d\u044c'}</h2>

        {isLoading && <p className="status">{'\u0417\u0430\u0432\u0430\u043d\u0442\u0430\u0436\u0435\u043d\u043d\u044f...'}</p>}

        {isError && (
          <p className="status error">
            {error instanceof Error ? error.message : '\u041d\u0435 \u0432\u0434\u0430\u043b\u043e\u0441\u044f \u0437\u0430\u0432\u0430\u043d\u0442\u0430\u0436\u0438\u0442\u0438 \u0441\u043f\u0438\u0441\u043e\u043a'}
          </p>
        )}

        {!isLoading && !isError && (
          <ul className="todo-list">
            {todos.map((todo) => (
              <li key={todo.id} className="todo-item">
                <span className={todo.completed ? 'completed' : ''}>
                  {todo.title}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  )
}

export default App