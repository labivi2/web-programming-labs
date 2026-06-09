import { useState } from 'react'
import { useNavigate } from 'react-router'
import { useTasksStore } from '../../store/useTasksStore'
import type { Task, TaskPriority } from '../../types/task'
import styles from './NewTaskPage.module.css'

export default function NewTaskPage() {
  const navigate = useNavigate()
  const addTask = useTasksStore((state) => state.addTask)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState<TaskPriority>('medium')
  const [error, setError] = useState('')

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    setError('')

    if (title.trim().length < 3) {
      setError('Назва має містити щонайменше 3 символи')
      return
    }

    const newTask: Task = {
      id: crypto.randomUUID(),
      title: title.trim(),
      description: description.trim(),
      status: 'todo',
      priority,
      createdAt: new Date(),
    }

    addTask(newTask)
    navigate('/tasks')
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Нова задача</h2>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.field}>
          <label htmlFor="title">Назва *</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Введіть назву задачі"
          />
          {error && <span className={styles.error}>{error}</span>}
        </div>

        <div className={styles.field}>
          <label htmlFor="description">Опис</label>
          <textarea
            id="description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Додатковий опис"
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="priority">Пріоритет</label>
          <select
            id="priority"
            value={priority}
            onChange={(event) =>
              setPriority(event.target.value as TaskPriority)
            }
          >
            <option value="low">Низький</option>
            <option value="medium">Середній</option>
            <option value="high">Високий</option>
          </select>
        </div>

        <div className={styles.actions}>
          <button type="submit" className={styles.submitBtn}>
            Створити задачу
          </button>
          <button
            type="button"
            className={styles.cancelBtn}
            onClick={() => navigate('/tasks')}
          >
            Скасувати
          </button>
        </div>
      </form>
    </div>
  )
}
