CREATE TABLE IF NOT EXISTS hotel_manager (
  email_bucket     INT    NOT NULL,
  user_id          BIGINT NOT NULL,
  managed_hotel_id   INT NOT NULL,      
  phone_office     TEXT NOT NULL,
  office_address   TEXT NOT NULL,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (email_bucket, user_id),
  CONSTRAINT fk_hotel_manager_user
    FOREIGN KEY (email_bucket, user_id)
    REFERENCES base_user_core(email_bucket, user_id)
    ON DELETE CASCADE
);

