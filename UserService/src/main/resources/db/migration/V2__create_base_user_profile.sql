CREATE TABLE IF NOT EXISTS user_profile (
  email_bucket   INT    NOT NULL,
  user_id        BIGINT NOT NULL,
  dob            DATE,
  address        TEXT,
  profile_picture TEXT,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (email_bucket, user_id),
  CONSTRAINT fk_user_profile_base_user
    FOREIGN KEY (email_bucket, user_id)
    REFERENCES base_user_core (email_bucket, user_id)
    ON DELETE CASCADE
);