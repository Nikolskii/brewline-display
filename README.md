# brewline-display

> **Экран очереди Brewline** — большой дисплей в зале кофейни, где клиенты видят актуальные статусы заказов в реальном времени.

![status](https://img.shields.io/badge/status-work_in_progress-yellow)
![stack](https://img.shields.io/badge/React-Vite-61DAFB)
![lang](https://img.shields.io/badge/TypeScript-strict-3178C6)

## Что такое Brewline

Виртуальная очередь для кофейни: заказы из кассы и веб-формы попадают в единую цифровую очередь.
Бариста меняют статусы напитков, а клиенты и экран в зале видят изменения **мгновенно, во всех местах сразу**.

> Учебный / портфолио-проект. Ценность — **инженерный процесс и системное мышление**, а не коробочный продукт.

## Роль этого репозитория

Публичный экран в зале — **только отображение** (read-only): своих мутаций нет, статусы меняет бариста через backend.
Инженерные решения:

- **Типы из контракта.** Доменные типы (`Order` и др.) приходят из пакета
  [`@brewline/api-types`](https://www.npmjs.com/package/@brewline/api-types), собранного из OpenAPI-спеки backend, —
  руками не дублируются, а версия контракта видна прямо в `package.json`. *(ADR 0008, 0009)*
- **Real-time через SSE.** При загрузке — снапшот очереди по REST, дальше — подписка на поток и live-перерисовка. *(ADR 0001)*

## Как работает

1. `GET /orders` — снапшот очереди при загрузке.
2. `GET /orders/stream` — подписка на SSE, экран обновляется live при каждой смене статуса.

## Стек

`React` · `Vite` · `TypeScript (strict)`

## Запуск

Нужен работающий backend — экран сам по себе только отображает данные.

**1. Поднять backend и базу** (в соседнем репозитории):

```bash
git clone https://github.com/Nikolskii/brewline-backend.git
cd brewline-backend
docker compose up          # MongoDB + backend на http://localhost:3000
npm run seed               # тестовые заказы в очереди
```

**2. Запустить экран:**

```bash
npm ci
npm run dev                # http://localhost:5173
```

В dev адрес backend задавать не нужно: Vite проксирует `/orders` на `localhost:3000`,
поэтому браузер работает с одним origin и CORS не участвует. `VITE_API_URL` (см. `.env.example`)
понадобится в проде, когда фронт и API окажутся на разных доменах.

Токены и приватные доступы не нужны: типы контракта тянутся из публичного npm-пакета.

**Проверить live-обновление.** Сменить статус заказа запросом к backend — экран должен перерисоваться
сам, без перезагрузки страницы:

```bash
curl -X PATCH http://localhost:3000/orders/<orderId>/status \
  -H 'Content-Type: application/json' \
  -d '{"status":"preparing"}'
```

`orderId` можно взять из `curl http://localhost:3000/orders`.

### Скрипты

| Команда | Что делает |
|---------|-----------|
| `npm run dev` | Dev-сервер Vite |
| `npm run build` | Проверка типов + production-сборка в `dist/` |
| `npm run preview` | Локальный просмотр production-сборки |
| `npm run lint` | ESLint (`lint:fix` — с автоисправлением) |
| `npm run format` | Prettier |

## Экосистема репозиториев

| Репо | Роль |
|------|------|
| [brewline-backend](https://github.com/Nikolskii/brewline-backend) | API + real-time (источник контракта) |
| **brewline-display** ← вы здесь | Экран очереди в зале |
| [brewline-infra](https://github.com/Nikolskii/brewline-infra) | Общая инфраструктура |

## Статус

🚧 В активной разработке. Текущий срез — **живая очередь локально**: смена статуса на backend → экран обновляется live через SSE.
