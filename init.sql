CREATE TABLE IF NOT EXISTS users (
    id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at  TIMESTAMP   NOT NULL DEFAULT now(),
    name        VARCHAR     NOT NULL,
    location    VARCHAR     NOT NULL,
    age         INTEGER     NOT NULL,
    email       VARCHAR     UNIQUE NOT NULL,
    password    VARCHAR     NOT NULL,
    lat         DOUBLE PRECISION NOT NULL,
    lng         DOUBLE PRECISION NOT NULL
);
CREATE TABLE IF NOT EXISTS events (
    id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at  TIMESTAMP   NOT NULL DEFAULT now(),
    title        VARCHAR     NOT NULL,
    location    VARCHAR     NOT NULL,
    image_url    VARCHAR     NOT NULL,
    city    VARCHAR     NOT NULL,
    full_location    VARCHAR     NOT NULL,
    category    VARCHAR     NOT NULL,
    color    VARCHAR     NOT NULL,
    date        TIMESTAMP   NOT NULL,
    description TEXT        NOT NULL,
    participants_count INTEGER NOT NULL,
    max_participants INTEGER NOT NULL,
    host_id      UUID REFERENCES users(id),
    price       INTEGER,
    lat         DOUBLE PRECISION NOT NULL,
    lng         DOUBLE PRECISION NOT NULL
);
CREATE TABLE IF NOT EXISTS profiles (
    id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at  TIMESTAMP   NOT NULL DEFAULT now(),
    user_id     UUID        NOT NULL UNIQUE REFERENCES users(id),
    avatar_url  VARCHAR,
    banner_url  VARCHAR
);
CREATE TABLE IF NOT EXISTS chats (
    id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at  TIMESTAMP   NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS chat_participants (
    id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at  TIMESTAMP   NOT NULL DEFAULT now(),
    chat_id     UUID        NOT NULL REFERENCES chats(id) ON DELETE CASCADE,
    profile_id     UUID        NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    UNIQUE (chat_id, profile_id)
);

CREATE TABLE IF NOT EXISTS messages (
    id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at  TIMESTAMP   NOT NULL DEFAULT now(),
    chat_id     UUID        NOT NULL REFERENCES chats(id) ON DELETE CASCADE,
    author_participant_id   UUID        NOT NULL REFERENCES chat_participants(id) ON DELETE CASCADE,
    text_message VARCHAR    NOT NULL,
    deleted_at  TIMESTAMP
);

CREATE TABLE IF NOT EXISTS message_read_status (
    id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at  TIMESTAMP   NOT NULL DEFAULT now(),
    message_id  UUID        NOT NULL REFERENCES messages(id) ON DELETE CASCADE,
    chat_participant_id     UUID        NOT NULL REFERENCES chat_participants(id) ON DELETE CASCADE,
    read        BOOLEAN     NOT NULL DEFAULT false,
    UNIQUE (message_id, chat_participant_id)
);
CREATE TYPE like_type_enum AS ENUM ('like', 'dislike', 'superlike');

CREATE TABLE likes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID NOT NULL,
  target_id UUID NOT NULL,
  type like_type_enum NOT NULL DEFAULT 'like',
  created_at TIMESTAMP NOT NULL DEFAULT now(),

  CONSTRAINT fk_likes_profile FOREIGN KEY (profile_id) REFERENCES profiles(id) ON DELETE CASCADE,
  CONSTRAINT fk_likes_target FOREIGN KEY (target_id) REFERENCES profiles(id) ON DELETE CASCADE,
  CONSTRAINT uq_likes_profile_target UNIQUE (profile_id, target_id)
);
CREATE TABLE matches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_a_id UUID NOT NULL,
  profile_b_id UUID NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP NOT NULL DEFAULT now(),

  CONSTRAINT fk_matches_profile_a FOREIGN KEY (profile_a_id) REFERENCES profiles(id) ON DELETE CASCADE,
  CONSTRAINT fk_matches_profile_b FOREIGN KEY (profile_b_id) REFERENCES profiles(id) ON DELETE CASCADE,
  CONSTRAINT uq_matches_pair UNIQUE (profile_a_id, profile_b_id)
);
CREATE INDEX idx_likes_target ON likes (target_id);
CREATE INDEX IF NOT EXISTS idx_chat_participants_profile ON chat_participants(profile_id);
CREATE INDEX IF NOT EXISTS idx_messages_chat ON messages(chat_id, created_at);
CREATE INDEX IF NOT EXISTS idx_message_read_status_profile ON message_read_status(chat_participant_id);