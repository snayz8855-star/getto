# 🎮 GETTO - Telegram Card Game Mini App

> Профессиональная многопользовательская карточная игра для Telegram

## 🌟 Особенности

✅ Игра 1 vs 1, на 4 и 6 игроков  
✅ Общий чат + чат за столом  
✅ Друзья и приглашения  
✅ Ежедневные бонусы  
✅ Турниры и рейтинг ELO  
✅ Лиги и достижения  
✅ История игр  
✅ Профиль с кастомизацией  
✅ Приватные и публичные комнаты  
✅ Магазин и боевой пропуск  
✅ VIP система и кланы  
✅ Админ-панель  
✅ Красивые анимации и звуки  

## 🚀 Технологический стек

### Frontend
- **React 18** + TypeScript
- **Vite** - сборщик проекта
- **TailwindCSS** - стили
- **Zustand** - управление состоянием
- **Telegram Mini App SDK**
- **WebSocket** - реал-тайм коммуникация

### Backend
- **Node.js** + Express
- **TypeScript**
- **PostgreSQL** - основная БД
- **Redis** - кэш и сессии
- **Socket.io** - WebSocket
- **JWT** - авторизация

## 📁 Структура проекта

```
getto/
├── frontend/           # React приложение
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── store/
│   │   ├── api/
│   │   └── assets/
│   └── package.json
│
├── backend/            # Node.js сервер
│   ├── src/
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── services/
│   │   ├── middleware/
│   │   └── config/
│   └── package.json
│
├── database/           # Миграции БД
│   ├── migrations/
│   └── schemas/
│
├── docs/               # Документация
│   ├── API.md
│   ├── Architecture.md
│   └── Setup.md
│
└── .github/workflows/  # CI/CD
```

## 📅 План разработки

### Этап 1: Основание
- [ ] Главный экран
- [ ] Telegram Mini App интеграция
- [ ] Профиль пользователя
- [ ] Навигация
- [ ] Базовый UI

### Этап 2: Сервер
- [ ] Backend инфраструктура
- [ ] Авторизация через Telegram
- [ ] База данных

### Этап 3: Коммуникация
- [ ] Общий чат
- [ ] Статус онлайн
- [ ] Система друзей

### Этап 4: Игра
- [ ] Комнаты (2, 4, 6 игроков)
- [ ] Мультиплеер логика
- [ ] Игровые механики

### Этап 5: Расширенные функции
- [ ] Турниры
- [ ] Рейтинг ELO
- [ ] Магазин
- [ ] Battle Pass

## 🔧 Установка

### Backend
```bash
cd backend
npm install
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## 📚 Документация

См. папку `/docs` для подробной информации:
- [API Documentation](./docs/API.md)
- [Architecture](./docs/Architecture.md)
- [Setup Guide](./docs/Setup.md)

## 👨‍💻 Автор

**snayz8855-star** - Full Stack Developer

## 📝 Лицензия

MIT
