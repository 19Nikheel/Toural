CREATE TABLE IF NOT EXISTS driver (
  email_bucket     INT    NOT NULL,
  user_id          BIGINT NOT NULL,
  license_number   TEXT NOT NULL,
  vehicle_type     TEXT NOT NULL,         -- car / bike / auto
  vehicle_model    TEXT NOT NULL,
  vehicle_number   TEXT NOT NULL,         -- registration no
  experience_years INT DEFAULT 0 NOT NULL,
  rating_avg       NUMERIC(3,2) DEFAULT 1.00
      CHECK (rating_avg >= 1.00 AND rating_avg <= 5.00),
  rating_count     INT DEFAULT 0,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (email_bucket, user_id),
  CONSTRAINT fk_driver_user
    FOREIGN KEY (email_bucket, user_id)
    REFERENCES base_user_core(email_bucket, user_id)
    ON DELETE CASCADE
);