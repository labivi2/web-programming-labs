import type { Task, TaskStatus } from "../../types/task";
import TaskCard from "../TaskCard/TaskCard";

type Props = {
  tasks: Task[];
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: TaskStatus) => void;
};

export default function TaskList({ tasks, onDelete, onStatusChange }: Props) {
  if (!tasks.length) return <p>No tasks</p>;

  return (
    <div>
      {tasks.map((t) => (
        <TaskCard
          key={t.id}
          task={t}
          onDelete={onDelete}
          onStatusChange={onStatusChange}
        />
      ))}
    </div>
  );
}