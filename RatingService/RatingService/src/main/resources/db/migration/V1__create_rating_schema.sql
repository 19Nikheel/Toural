CREATE TABLE IF NOT EXISTS user_target_reviews (
  user_id BIGINT NOT NULL,
  target_type TEXT NOT NULL,    -- 'hotel', 'guide', 'driver'
  target_id BIGINT NOT NULL,
  rating SMALLINT NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ,
  PRIMARY KEY (user_id, target_type, target_id)
) PARTITION BY LIST (target_type);

-- 2) Partitions
CREATE TABLE IF NOT EXISTS user_target_reviews_hotel PARTITION OF user_target_reviews
  FOR VALUES IN ('hotel');

CREATE TABLE IF NOT EXISTS user_target_reviews_guide PARTITION OF user_target_reviews
  FOR VALUES IN ('guide');

CREATE TABLE IF NOT EXISTS user_target_reviews_driver PARTITION OF user_target_reviews
  FOR VALUES IN ('driver');


CREATE INDEX IF NOT EXISTS idx_utr_hotel_rating_with_comments ON
	user_target_reviews_hotel (target_id, rating, created_at DESC) WHERE comment IS NOT NULL;


CREATE TABLE IF NOT EXISTS hotel_rating_agg (
  hotel_id BIGINT PRIMARY KEY,
  rating NUMERIC(5,3) NOT NULL DEFAULT 0, -- precision as needed
  review_count BIGINT NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS guide_rating_agg (
  guide_id BIGINT PRIMARY KEY,
  rating NUMERIC(5,3) NOT NULL DEFAULT 0,
  review_count BIGINT NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS driver_rating_agg (
  driver_id BIGINT PRIMARY KEY,
  rating NUMERIC(5,3) NOT NULL DEFAULT 0,
  review_count BIGINT NOT NULL DEFAULT 0
);