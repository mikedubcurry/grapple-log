CREATE TABLE techniques (
  id VARCHAR(36) PRIMARY KEY,
  user_id VARCHAR(36) NOT NULL,
  name VARCHAR(255) NOT NULL,
  art ENUM('bjj', 'muay_thai', 'capoeira') NOT NULL,
  position VARCHAR(255),
  category VARCHAR(255),
  last_drilled_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_user_id (user_id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);
