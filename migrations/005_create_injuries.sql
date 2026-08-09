CREATE TABLE injuries (
  id VARCHAR(36) PRIMARY KEY,
  session_id VARCHAR(36) NOT NULL,
  body_part VARCHAR(255) NOT NULL,
  severity ENUM('mild', 'moderate', 'severe') NOT NULL,
  description TEXT,
  still_active TINYINT(1) DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (session_id) REFERENCES sessions(id) ON DELETE CASCADE
);
