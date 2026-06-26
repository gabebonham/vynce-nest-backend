CREATE TABLE IF NOT EXISTS users (
    id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at  TIMESTAMP   NOT NULL DEFAULT now(),
    name        VARCHAR     NOT NULL,
    location    VARCHAR     NOT NULL,
    age         INTEGER     NOT NULL,
    email       VARCHAR     UNIQUE NOT NULL,
    password    VARCHAR     NOT NULL
);