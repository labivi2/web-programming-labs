# Lab 5: API Integration

React + TypeScript застосунок для роботи з локальним REST API. Застосунок отримує список завдань із JSON Server, додає нові завдання, змінює статус виконання та видаляє записи.

## Технології

- Vite
- React
- TypeScript
- TanStack Query
- JSON Server
- fetch

## API

Локальний сервер працює на `http://localhost:3001` і використовує ресурс `/todos`.

Методи:

- `GET /todos` - отримати всі завдання
- `POST /todos` - створити завдання
- `PATCH /todos/:id` - оновити завдання
- `DELETE /todos/:id` - видалити завдання

## Запуск

Термінал 1:

```powershell
npm.cmd run server
```

Термінал 2:

```powershell
npm.cmd run dev
```

React-застосунок відкривається за адресою, яку покаже Vite. Дані JSON Server доступні за адресою `http://localhost:3001/todos`.
