# Лабораторна робота №8 — Інтеграція бази даних у Nest.js

## Опис

Task Manager API — серверний застосунок на Nest.js для управління задачами та тегами.
Дані зберігаються у PostgreSQL за допомогою TypeORM.

## Технології

- Nest.js + TypeScript
- PostgreSQL
- TypeORM
- @nestjs/config
- class-validator

## Запуск

1. Встановіть PostgreSQL.
2. Створіть базу даних:

```sql
CREATE DATABASE lab8;
```

3. Скопіюйте `.env.example` у `.env`.
4. Вкажіть дані підключення до PostgreSQL у `.env`.
5. Встановіть залежності:

```bash
npm install
```

6. Виконайте міграцію:

```bash
npm run migration:run
```

7. Запустіть застосунок:

```bash
npm run start:dev
```

## Змінні середовища

| Змінна | Опис | Приклад |
| --- | --- | --- |
| PORT | Порт застосунку | 3000 |
| DB_HOST | Адреса PostgreSQL | localhost |
| DB_PORT | Порт PostgreSQL | 5432 |
| DB_USERNAME | Користувач PostgreSQL | postgres |
| DB_PASSWORD | Пароль користувача | password |
| DB_DATABASE | Назва бази даних | lab8 |

## Міграції

```bash
npm run migration:generate
npm run migration:run
npm run migration:revert
```

## Ендпоінти задач

| Метод | URL | Опис |
| --- | --- | --- |
| GET | /tasks | Отримати всі задачі з тегами |
| GET | /tasks/search?status=... | Фільтрація за статусом |
| GET | /tasks/:id | Отримати задачу за id |
| POST | /tasks | Створити задачу |
| PATCH | /tasks/:id | Оновити задачу |
| DELETE | /tasks/:id | Видалити задачу |

## Ендпоінти тегів

| Метод | URL | Опис |
| --- | --- | --- |
| GET | /tags | Отримати всі теги |
| GET | /tags/:id | Отримати тег за id |
| POST | /tags | Створити тег |
| PATCH | /tags/:id | Оновити тег |
| DELETE | /tags/:id | Видалити тег |

## Приклад створення тегу

```json
{
  "name": "backend"
}
```

## Приклад створення задачі з тегами

```json
{
  "title": "Створити API",
  "description": "Підключити PostgreSQL",
  "priority": "high",
  "tagIds": [1]
}
```
