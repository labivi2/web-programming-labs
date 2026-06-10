import axios from 'axios';
import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';

interface Task {
  id: number;
  title: string;
}

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
});

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState('');

  const loadTasks = async () => {
    const response = await api.get<Task[]>('/tasks');
    setTasks(response.data);
  };

  useEffect(() => {
    api.get<Task[]>('/tasks').then((response) => {
      setTasks(response.data);
    });
  }, []);

  const createTask = async (event: FormEvent) => {
    event.preventDefault();
    await api.post('/tasks', { title });
    setTitle('');
    await loadTasks();
  };

  return (
    <main>
      <section>
        <h1>Список завдань</h1>

        <form onSubmit={createTask}>
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Нове завдання"
            required
          />
          <button>Додати</button>
        </form>

        <ul>
          {tasks.map((task) => (
            <li key={task.id}>{task.title}</li>
          ))}
        </ul>
      </section>
    </main>
  );
}

export default App;
