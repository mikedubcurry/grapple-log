CREATE TABLE sessions (
  id VARCHAR(36) PRIMARY KEY,
  user_id VARCHAR(36) NOT NULL,
  art ENUM('bjj', 'muay_thai', 'capoeira') NOT NULL,
  duration_minutes INT NOT NULL,
  rounds INT NOT NULL DEFAULT 0,
  body_state TINYINT NOT NULL DEFAULT 3,
  notes TEXT,
  session_date DATE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_user_id (user_id),
  INDEX idx_session_date (session_date),
  FOREIGN KEY (user_id) REFERENCES users(id)
);
