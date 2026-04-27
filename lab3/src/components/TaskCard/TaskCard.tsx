import type { Task, TaskStatus } from "../../types/task";

type Props = {
  task: Task;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: TaskStatus) => void;
};

export default function TaskCard({ task, onDelete, onStatusChange }: Props) {
  return (
    <div>
      <h3>{task.title}</h3>
      <p>{task.description}</p>

      <select
        value={task.status}
        onChange={(e) => onStatusChange(task.id, e.target.value as TaskStatus)}
      >
        <option value="todo">todo</option>
        <option value="in-progress">in-progress</option>
        <option value="done">done</option>
      </select>

      <button onClick={() => onDelete(task.id)}>Delete</button>
    </div>
  );
}