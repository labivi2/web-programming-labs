import { BrowserRouter, Navigate, Route, Routes } from 'react-router'
import Layout from './components/Layout/Layout'
import NewTaskPage from './pages/NewTaskPage/NewTaskPage'
import TaskDetailPage from './pages/TaskDetailPage/TaskDetailPage'
import TasksPage from './pages/TasksPage/TasksPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/tasks" replace />} />
          <Route path="tasks" element={<TasksPage />} />
          <Route path="tasks/new" element={<NewTaskPage />} />
          <Route path="tasks/:id" element={<TaskDetailPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
