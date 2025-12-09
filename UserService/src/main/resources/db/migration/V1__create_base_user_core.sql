-- ===============================
-- 1) Create global user_id sequence
-- ===============================
CREATE SEQUENCE IF NOT EXISTS user_seq
    START 1
    INCREMENT 1
    MINVALUE 1
    CACHE 100;


-- ======================================
-- 2) Create parent partitioned table
-- ======================================
CREATE TABLE IF NOT EXISTS base_user_core (
    email_bucket  INT    NOT NULL,
    user_id       BIGINT NOT NULL DEFAULT nextval('user_seq'),
    name          TEXT   NOT NULL,
    email         TEXT   NOT NULL,
    email_norm    TEXT   NOT NULL,
    phone_no      TEXT   NOT NULL,
    user_type     TEXT   NOT NULL,
    created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
    is_active     BOOLEAN NOT NULL DEFAULT true,
    PRIMARY KEY (email_bucket, user_id)   -- << include partition key here
)PARTITION BY LIST (email_bucket);


-- ============================================
-- 3) Create 16 partitions: bucket 0 to 15
-- ============================================
DO $$
DECLARE
   i INT;
BEGIN
   FOR i IN 0..15 LOOP
      EXECUTE format(
         'CREATE TABLE IF NOT EXISTS base_user_core_p%s
             PARTITION OF base_user_core
             FOR VALUES IN (%s);',
          i, i
      );
   END LOOP;
END $$;


-- ============================================
-- 4) Global uniqueness of email
--    (must include partition key!!)
-- ============================================
DO $$
BEGIN
    ALTER TABLE base_user_core
        ADD CONSTRAINT uq_email_norm_per_bucket
        UNIQUE (email_bucket, email_norm);
EXCEPTION
    WHEN duplicate_object THEN
        -- constraint already exists, do nothing
        NULL;
END $$;





