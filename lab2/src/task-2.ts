import { VARIANT } from "./config";

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

const tasks: Task[] = [
  {
    id: 1 + VARIANT,
    title: "Розробити API",
    description: "Реалізувати REST API для управління задачами",
    status: "in_progress",
    priority: "high",
    assignee: "Іван Петренко",
    createdAt: new Date("2025-01-10"),
    dueDate: new Date("2025-02-01"),
  },
  {
    id: 2 + VARIANT,
    title: "Написати тести",
    description: "Покрити unit-тестами основну логіку",
    status: "todo",
    priority: "medium",
    assignee: null,
    createdAt: new Date("2025-01-12"),
    dueDate: new Date("2025-02-15"),
  },
  {
    id: 3 + VARIANT,
    title: "Налаштувати БД",
    description: "Підключити PostgreSQL, виконати міграції",
    status: "done",
    priority: "critical",
    assignee: "Олена Коваль",
    createdAt: new Date("2025-01-05"),
    dueDate: new Date("2025-01-20"),
  },
  {
    id: 4 + VARIANT,
    title: "Оновити документацію",
    description: "Описати API у Swagger",
    status: "todo",
    priority: "low",
    assignee: null,
    createdAt: new Date("2025-01-15"),
    dueDate: null,
  },
  {
    id: 5 + VARIANT,
    title: "Code review",
    description: "Перевірити pull request від команди",
    status: "cancelled",
    priority: "medium",
    assignee: "Андрій Лисенко",
    createdAt: new Date("2025-01-18"),
    dueDate: new Date("2025-01-25"),
  },
];
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
  timestamp: Date;
}
function createSuccessResponse<T>(data: T): ApiResponse<T> {
  return {
    data,
    status: 200,
    message: "success",
    timestamp: new Date(),
  };
}
function createErrorResponse<T>(message: string): ApiResponse<T | null> {
  return {
    data: null,
    status: 500,
    message,
    timestamp: new Date(),
  };
}
type CreateTaskDto = Omit<Task, "id" | "createdAt">;

type UpdateTaskDto = Partial<Omit<Task, "id" | "createdAt">>;
function filterTasks<K extends keyof Task>(
  tasks: Task[],
  key: K,
  value: Task[K]
): Task[] {
  return tasks.filter((task) => task[key] === value);
}
console.log("=== Завдання 2: Generics та Utility Types ===");
console.log("Варіант:", VARIANT);

console.log("Success response:");
console.log(createSuccessResponse(tasks));

console.log("Error response:");
console.log(createErrorResponse<Task[]>("Something went wrong"));

console.log("Filter by status = todo:");
console.log(filterTasks(tasks, "status", "todo"));

console.log("Filter by priority = high:");
console.log(filterTasks(tasks, "priority", "high"));