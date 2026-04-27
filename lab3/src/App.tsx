import { useState } from "react";
import TaskForm from "./components/TaskForm/TaskForm";
import TaskList from "./components/TaskList/TaskList";
import type { Task, TaskStatus } from "./types/task";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (data: any) => {
    setTasks((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        title: data.title,
        description: data.description || "",
        priority: data.priority,
        status: "todo",
        createdAt: new Date(),
      },
    ]);
  };

  const deleteTask = (id: string) => {
    setTasks((p) => p.filter((t) => t.id !== id));
  };

  const changeStatus = (id: string, status: TaskStatus) => {
    setTasks((p) =>
      p.map((t) => (t.id === id ? { ...t, status } : t))
    );
  };

  return (
    <div>
      <h1>Task Manager</h1>

      <TaskForm onSubmit={addTask} />

      <TaskList
        tasks={tasks}
        onDelete={deleteTask}
        onStatusChange={changeStatus}
      />
    </div>
  );
}

export default App;