# 📚 API документация GETTO

## Базовый URL
```
http://localhost:3000/api
```

## Authentication

Все защищённые эндпоинты требуют JWT токен в заголовке:
```
Authorization: Bearer <token>
```

## Endpoints

### Auth

#### Авторизация через Telegram
```
POST /auth/telegram
Body: { telegramData: {...} }
Response: { token: "jwt_token", user: {...} }
```

### Users

#### Получить профиль
```
GET /users/profile
Headers: Authorization
Response: { id, username, level, elo_rating, ... }
```

#### Обновить профиль
```
PUT /users/profile
Headers: Authorization
Body: { username, photoUrl, ... }
Response: { success: true }
```

### Rooms

#### Получить все комнаты
```
GET /rooms
Response: [{ id, name, type, players, ... }, ...]
```

#### Создать комнату
```
POST /rooms
Headers: Authorization
Body: { name, type, isPrivate, password }
Response: { id, ... }
```

#### Присоединиться к комнате
```
POST /rooms/:roomId/join
Headers: Authorization
Response: { success: true }
```

### Games

#### Получить историю игр
```
GET /games/history
Headers: Authorization
Response: [{ id, opponent, result, ... }, ...]
```

### Chat

#### Получить сообщения
```
GET /chat/messages?roomId=:roomId
Response: [{ id, user, text, timestamp }, ...]
```

## WebSocket Events

### Emit (отправляем на сервер)

- `game:move` - сделать ход
- `game:ready` - игрок готов
- `chat:message` - отправить сообщение
- `room:leave` - покинуть комнату

### On (получаем от сервера)

- `game:update` - обновление состояния игры
- `chat:new_message` - новое сообщение
- `room:player_joined` - игрок присоединился
- `room:player_left` - игрок ушёл

## Error Codes

```
400 - Bad Request
401 - Unauthorized
403 - Forbidden
404 - Not Found
409 - Conflict
500 - Internal Server Error
```
