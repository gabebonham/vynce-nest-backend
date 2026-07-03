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