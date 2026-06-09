import { Link, useNavigate, useParams } from 'react-router'
import { useTasksStore } from '../../store/useTasksStore'
import type { TaskStatus } from '../../types/task'
import styles from './TaskDetailPage.module.css'

export default function TaskDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const tasks = useTasksStore((state) => state.tasks)
  const updateTask = useTasksStore((state) => state.updateTask)
  const deleteTask = useTasksStore((state) => state.deleteTask)
  const task = tasks.find((item) => item.id === id)

  if (!task) {
    return (
      <div className={styles.notFound}>
        <p>Задачу не знайдено.</p>
        <Link to="/tasks">Назад до списку</Link>
      </div>
    )
  }

  const handleStatusChange = (status: TaskStatus) => {
    updateTask({ ...task, status })
  }

  const handleDelete = () => {
    deleteTask(task.id)
    navigate('/tasks')
  }

  return (
    <div className={styles.container}>
      <Link to="/tasks" className={styles.back}>
        Назад до списку
      </Link>

      <div className={styles.card}>
        <h2 className={styles.title}>{task.title}</h2>

        {task.description && (
          <p className={styles.description}>{task.description}</p>
        )}

        <div className={styles.meta}>
          <div>
            <label>Пріоритет: </label>
            {task.priority === 'high'
              ? 'Високий'
              : task.priority === 'medium'
                ? 'Середній'
                : 'Низький'}
          </div>
          <div>
            <label>Статус: </label>
            <select
              className={styles.select}
              value={task.status}
              onChange={(event) =>
                handleStatusChange(event.target.value as TaskStatus)
              }
            >
              <option value="todo">Очікує</option>
              <option value="in-progress">В роботі</option>
              <option value="done">Виконано</option>
            </select>
          </div>
          <div>
            <label>Створено: </label>
            {task.createdAt.toLocaleDateString('uk-UA')}
          </div>
        </div>

        <button className={styles.deleteBtn} onClick={handleDelete}>
          Видалити задачу
        </button>
      </div>
    </div>
  )
}
