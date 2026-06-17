# Setup Guide

## Requirements
- Node.js 16+
- PostgreSQL 12+
- npm or yarn

## Installation

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

## Environment Variables

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

## Database Setup

```bash
psql -U postgres
CREATE DATABASE getto;
\q

psql -U postgres -d getto -f database/migrations/001_init.sql
```

## Running

Backend: `http://localhost:3000`
Frontend: `http://localhost:5173`
