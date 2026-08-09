CREATE TABLE session_techniques (
  id VARCHAR(36) PRIMARY KEY,
  session_id VARCHAR(36) NOT NULL,
  technique_id VARCHAR(36) NOT NULL,
  drill_count INT DEFAULT 1,
  notes TEXT,
  FOREIGN KEY (session_id) REFERENCES sessions(id) ON DELETE CASCADE,
  FOREIGN KEY (technique_id) REFERENCES techniques(id) ON DELETE CASCADE
);
