export {};
type Status = "todo" | "in_progress" | "done" | "cancelled";
type Priority = "low" | "medium" | "high" | "critical";
interface Task {
  id: number;
  title: string;
  description: string;
  status: Status;
  priority: Priority;
  assignee: string | null;
  createdAt: Date;
  dueDate: Date | null;
}
interface HasId {
  id: number;
}
interface Project extends HasId {
  name: string;
  description: string;
  tasks: Task[];
  ownerId: number;
}

function getTaskStats(tasks: Task[]) {
  const byStatus: Record<Status, number> = {
    todo: 0,
    in_progress: 0,
    done: 0,
    cancelled: 0,
  };

  let overdue = 0;

  for (const task of tasks) {
    byStatus[task.status]++;

    const isOverdue =
      task.dueDate !== null &&
      task.dueDate < new Date() &&
      task.status !== "done" &&
      task.status !== "cancelled";

    if (isOverdue) overdue++;
  }

  return {
    total: tasks.length,
    byStatus,
    overdue,
  };
}
function formatTask(task: Task): string {
  return `[#${task.id}] ${task.title} (${task.priority}, ${task.status})`;
}
const tasks: Task[] = [
  {
    id: 1,
    title: "Setup project",
    description: "Init repo",
    status: "done",
    priority: "high",
    assignee: "Viktor",
    createdAt: new Date("2026-04-01"),
    dueDate: new Date("2026-04-05"),
  },
  {
    id: 2,
    title: "API design",
    description: "Design backend",
    status: "in_progress",
    priority: "critical",
    assignee: null,
    createdAt: new Date("2026-04-02"),
    dueDate: new Date("2026-04-20"),
  },
  {
    id: 3,
    title: "UI mockup",
    description: "Design UI",
    status: "todo",
    priority: "medium",
    assignee: null,
    createdAt: new Date("2026-04-03"),
    dueDate: new Date("2026-04-10"),
  },
  {
    id: 4,
    title: "Fix bugs",
    description: "Fix issues",
    status: "cancelled",
    priority: "low",
    assignee: "Dev",
    createdAt: new Date("2026-04-01"),
    dueDate: null,
  },
  {
    id: 5,
    title: "Write tests",
    description: "Add tests",
    status: "in_progress",
    priority: "high",
    assignee: "QA",
    createdAt: new Date("2026-04-04"),
    dueDate: new Date("2026-04-08"),
  },
];
console.log("=== Task 1 ===");
for (const t of tasks) {
  console.log(formatTask(t));
}

console.log(getTaskStats(tasks));