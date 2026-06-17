# 🏗️ Архитектура проекта GETTO

## Общая структура

```
Client (Telegram Mini App)
    ↓↓↓
 Frontend (React)
    ↓↓↓
  API (REST) + WebSocket
    ↓↓↓
 Backend (Node.js + Express)
    ↓↓↓
├── Database (PostgreSQL)
├── Cache (Redis)
└── Socket.IO Server
```

## Frontend архитектура

### Компоненты
- **Pages** - основные страницы приложения
- **Components** - переиспользуемые компоненты UI
- **Hooks** - custom React hooks для логики
- **Store** - управление глобальным состоянием (Zustand)
- **API** - слой для запросов на сервер
- **Assets** - изображения, звуки, анимации

### State Management
Используем **Zustand** для простого и эффективного управления состоянием:

```typescript
// Пример store
const useGameStore = create((set) => ({
  players: [],
  currentRoom: null,
  setCurrentRoom: (room) => set({ currentRoom: room }),
}))
```

## Backend архитектура

### Routes
RESTful API endpoints для операций CRUD

### Controllers
Обработка логики запросов и ответов

### Services
Бизнес-логика приложения:
- GameService - логика игры
- ChatService - управление чатом
- UserService - работа с пользователями
- AuthService - авторизация

### Models
Models для работы с БД через raw SQL или ORM

### Middleware
- Authentication - проверка JWT токенов
- Validation - валидация данных
- Error handling - обработка ошибок

## База данных (PostgreSQL)

### Основные таблицы
1. **users** - информация о пользователях
2. **friends** - список друзей
3. **rooms** - игровые комнаты
4. **room_players** - игроки в комнатах
5. **games** - история игр
6. **messages** - сообщения в чате
7. **achievements** - достижения
8. **user_achievements** - достижения пользователей

## Real-time коммуникация (Socket.IO)

Для синхронизации в реальном времени:
- Игровые события
- Сообщения чата
- Статусы игроков
- Обновления комнат

## Безопасность

1. **JWT токены** - авторизация
2. **CORS** - ограничение кросс-доменных запросов
3. **Валидация** - проверка всех входных данных
4. **Rate limiting** - защита от DDoS
5. **Античит система** - проверка честности игры

## Масштабируемость

- **Кэширование** через Redis
- **Микросервисная архитектура** (будущее)
- **Горизонтальное масштабирование** серверов
- **Балансировка нагрузки** через nginx
