# Anatomy Explorer - Database Schema

## Tables

### Users
```sql
CREATE TABLE users (
  id VARCHAR(36) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('user', 'admin') DEFAULT 'user',
  email_verified BOOLEAN DEFAULT FALSE,
  verification_token VARCHAR(255),
  reset_token VARCHAR(255),
  reset_token_expires TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### Subscriptions
```sql
CREATE TABLE subscriptions (
  id VARCHAR(36) PRIMARY KEY,
  user_id VARCHAR(36) NOT NULL,
  status ENUM('active', 'trial', 'inactive', 'canceled') NOT NULL,
  plan ENUM('basic', 'premium', 'professional') NOT NULL,
  start_date TIMESTAMP NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  auto_renew BOOLEAN DEFAULT FALSE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

### Muscles
```sql
CREATE TABLE muscles (
  id VARCHAR(36) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  latin_name VARCHAR(100),
  description TEXT,
  image_url VARCHAR(255),
  model_url VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### MuscleDetails
```sql
CREATE TABLE muscle_details (
  id VARCHAR(36) PRIMARY KEY,
  muscle_id VARCHAR(36) NOT NULL,
  origin TEXT NOT NULL,
  insertion TEXT NOT NULL,
  action TEXT NOT NULL,
  nerve_supply TEXT,
  blood_supply TEXT,
  FOREIGN KEY (muscle_id) REFERENCES muscles(id) ON DELETE CASCADE
);
```

### MuscleGroups
```sql
CREATE TABLE muscle_groups (
  id VARCHAR(36) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  region ENUM('head', 'neck', 'upper_limb', 'thorax', 'abdomen', 'pelvis', 'lower_limb') NOT NULL
);
```

### MuscleGroupRelations
```sql
CREATE TABLE muscle_group_relations (
  muscle_id VARCHAR(36) NOT NULL,
  group_id VARCHAR(36) NOT NULL,
  PRIMARY KEY (muscle_id, group_id),
  FOREIGN KEY (muscle_id) REFERENCES muscles(id) ON DELETE CASCADE,
  FOREIGN KEY (group_id) REFERENCES muscle_groups(id) ON DELETE CASCADE
);
```

### UserFavorites
```sql
CREATE TABLE user_favorites (
  user_id VARCHAR(36) NOT NULL,
  muscle_id VARCHAR(36) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id, muscle_id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (muscle_id) REFERENCES muscles(id) ON DELETE CASCADE
);
```

### Comments
```sql
CREATE TABLE comments (
  id VARCHAR(36) PRIMARY KEY,
  user_id VARCHAR(36) NOT NULL,
  muscle_id VARCHAR(36) NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (muscle_id) REFERENCES muscles(id) ON DELETE CASCADE
);
```

### AdminLogs
```sql
CREATE TABLE admin_logs (
  id VARCHAR(36) PRIMARY KEY,
  user_id VARCHAR(36) NOT NULL,
  action VARCHAR(100) NOT NULL,
  entity_type VARCHAR(50) NOT NULL,
  entity_id VARCHAR(36) NOT NULL,
  details TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);
```

## Indexes

```sql
CREATE INDEX idx_user_email ON users(email);
CREATE INDEX idx_subscription_user ON subscriptions(user_id);
CREATE INDEX idx_subscription_status ON subscriptions(status);
CREATE INDEX idx_muscle_group_region ON muscle_groups(region);
CREATE INDEX idx_comment_muscle ON comments(muscle_id);
```

## Relationships

1. Users ↔ Subscriptions: One-to-Many
2. Users ↔ Comments: One-to-Many
3. Users ↔ Favorites: One-to-Many
4. Muscles ↔ MuscleDetails: One-to-One
5. Muscles ↔ MuscleGroups: Many-to-Many (via MuscleGroupRelations)
6. Muscles ↔ Comments: One-to-Many
