-- Users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  telegram_id BIGINT UNIQUE NOT NULL,
  username VARCHAR(255),
  first_name VARCHAR(255),
  last_name VARCHAR(255),
  photo_url TEXT,
  level INT DEFAULT 1,
  experience INT DEFAULT 0,
  coins INT DEFAULT 1000,
  gems INT DEFAULT 0,
  elo_rating INT DEFAULT 1000,
  total_wins INT DEFAULT 0,
  total_losses INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Friends table
CREATE TABLE friends (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  friend_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  status VARCHAR(50) DEFAULT 'pending', -- pending, accepted, blocked
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, friend_id)
);

-- Rooms table
CREATE TABLE rooms (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  status VARCHAR(50) DEFAULT 'waiting', -- waiting, playing, finished
  room_type VARCHAR(50), -- 1v1, 4players, 6players
  max_players INT,
  current_players INT DEFAULT 0,
  created_by INT REFERENCES users(id),
  is_private BOOLEAN DEFAULT FALSE,
  password VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Room players table
CREATE TABLE room_players (
  id SERIAL PRIMARY KEY,
  room_id INT NOT NULL REFERENCES rooms(id) ON DELETE CASCADE,
  user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  position INT,
  cards_count INT DEFAULT 0,
  is_ready BOOLEAN DEFAULT FALSE,
  joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(room_id, user_id)
);

-- Games table
CREATE TABLE games (
  id SERIAL PRIMARY KEY,
  room_id INT REFERENCES rooms(id),
  winner_id INT REFERENCES users(id),
  loser_id INT REFERENCES users(id),
  game_type VARCHAR(50),
  duration INT, -- in seconds
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Messages table
CREATE TABLE messages (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  room_id INT REFERENCES rooms(id),
  message_text TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Achievements table
CREATE TABLE achievements (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  icon_url TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User achievements table
CREATE TABLE user_achievements (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  achievement_id INT NOT NULL REFERENCES achievements(id) ON DELETE CASCADE,
  unlocked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, achievement_id)
);

-- Create indexes for better performance
CREATE INDEX idx_users_telegram_id ON users(telegram_id);
CREATE INDEX idx_friends_user_id ON friends(user_id);
CREATE INDEX idx_rooms_status ON rooms(status);
CREATE INDEX idx_games_winner_id ON games(winner_id);
CREATE INDEX idx_messages_user_id ON messages(user_id);
CREATE INDEX idx_messages_room_id ON messages(room_id);
