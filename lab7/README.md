# Лабораторна робота №7 — CRUD API на Nest.js

## Опис

CRUD API для управління задачами на Nest.js.
Підтримує створення, отримання, фільтрацію, оновлення та видалення задач.

## Технології

- Nest.js + TypeScript
- @nestjs/config
- class-validator
- class-transformer

## Ендпоінти

| Метод | URL | Успішний статус | Помилки |
| --- | --- | --- | --- |
| GET | /tasks | 200 OK | — |
| GET | /tasks/search?status=... | 200 OK | — |
| GET | /tasks/:id | 200 OK | 404 Not Found |
| POST | /tasks | 201 Created | 400 Bad Request |
| PATCH | /tasks/:id | 200 OK | 400 Bad Request, 404 Not Found |
| DELETE | /tasks/:id | 204 No Content | 404 Not Found |

## Валідація

ValidationPipe підключений глобально з параметрами:

- `whitelist: true`
- `transform: true`

## Запуск

1. Скопіюйте `.env.example` у `.env`
2. `npm install`
3. `npm run start:dev`
