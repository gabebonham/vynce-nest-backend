CREATE TABLE IF NOT EXISTS users (
    id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at  TIMESTAMP   NOT NULL DEFAULT now(),
    name        VARCHAR     NOT NULL,
    location    VARCHAR     NOT NULL,
    age         INTEGER     NOT NULL,
    email       VARCHAR     UNIQUE NOT NULL,
    password    VARCHAR     NOT NULL
);
CREATE TABLE IF NOT EXISTS events (
    id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at  TIMESTAMP   NOT NULL DEFAULT now(),
    title        VARCHAR     NOT NULL,
    location    VARCHAR     NOT NULL,
    imageUrl    VARCHAR     NOT NULL,
    city    VARCHAR     NOT NULL,
    fullLocation    VARCHAR     NOT NULL,
    category    VARCHAR     NOT NULL,
    color    VARCHAR     NOT NULL,
    date        TIMESTAMP   NOT NULL,
    description TEXT        NOT NULL,
    participantsCount INTEGER NOT NULL,
    maxParticipants INTEGER NOT NULL,
    hostId      UUID REFERENCES users(id),
    price       INTEGER,
    lat         DOUBLE PRECISION NOT NULL,
    lng         DOUBLE PRECISION NOT NULL
);
CREATE TABLE IF NOT EXISTS profiles (
    id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at  TIMESTAMP   NOT NULL DEFAULT now(),
    user_id     UUID        NOT NULL UNIQUE REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS chats (
    id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at  TIMESTAMP   NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS chat_participants (
    id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at  TIMESTAMP   NOT NULL DEFAULT now(),
    chat_id     UUID        NOT NULL REFERENCES chats(id) ON DELETE CASCADE,
    user_id     UUID        NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    UNIQUE (chat_id, user_id)
);

CREATE TABLE IF NOT EXISTS messages (
    id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at  TIMESTAMP   NOT NULL DEFAULT now(),
    chat_id     UUID        NOT NULL REFERENCES chats(id) ON DELETE CASCADE,
    author_id   UUID        NOT NULL REFERENCES profiles(id),
    text_message VARCHAR    NOT NULL,
    deleted_at  TIMESTAMP
);

CREATE TABLE IF NOT EXISTS message_read_status (
    id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at  TIMESTAMP   NOT NULL DEFAULT now(),
    message_id  UUID        NOT NULL REFERENCES messages(id) ON DELETE CASCADE,
    user_id     UUID        NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    read        BOOLEAN     NOT NULL DEFAULT false,
    received    BOOLEAN     NOT NULL DEFAULT false,
    UNIQUE (message_id, user_id)
);

CREATE INDEX IF NOT EXISTS idx_chat_participants_user ON chat_participants(user_id);
CREATE INDEX IF NOT EXISTS idx_messages_chat ON messages(chat_id, created_at);
CREATE INDEX IF NOT EXISTS idx_message_read_status_user ON message_read_status(user_id);