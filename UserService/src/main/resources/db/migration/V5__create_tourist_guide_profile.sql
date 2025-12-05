CREATE TABLE IF NOT EXISTS tourist_guide (
  email_bucket    INT    NOT NULL,
  user_id         BIGINT NOT NULL,
  bio             TEXT NOT NULL,
  languages       JSONB,        -- e.g. ['en','hi','fr'] or [{code:'en',level:'native'}]
  certifications  TEXT[],
  hourly_rate     NUMERIC(10,2) NOT NULL,
  rating_avg NUMERIC(3,2) DEFAULT 0.00
    CHECK (rating_avg >= 1.00 AND rating_avg <= 5.00),
  rating_count    INT DEFAULT 0,
  location        TEXT NOT NULL,         
  availability    JSONB NOT NULL,        -- flexible schedule (e.g. days/hours as JSON)
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (email_bucket, user_id),
  CONSTRAINT fk_tourist_guide_user
    FOREIGN KEY (email_bucket, user_id)
    REFERENCES base_user_core (email_bucket, user_id)
    ON DELETE CASCADE
);