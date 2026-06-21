CREATE OR REPLACE FUNCTION user_target_reviews_agg_trigger()
RETURNS trigger
LANGUAGE plpgsql AS
$$
BEGIN
  -- INSERT
  IF (TG_OP = 'INSERT') THEN
    IF NEW.target_type = 'hotel' THEN
      INSERT INTO hotel_rating_agg (hotel_id, rating, review_count)
      VALUES (NEW.target_id, NEW.rating, 1)
      ON CONFLICT (hotel_id) DO UPDATE
      SET
        rating = hotel_rating_agg.rating + EXCLUDED.rating,
		review_count = hotel_rating_agg.review_count + 1;

    ELSIF NEW.target_type = 'guide' THEN
      INSERT INTO guide_rating_agg (guide_id, rating, review_count)
      VALUES (NEW.target_id, NEW.rating, 1)
      ON CONFLICT (guide_id) DO UPDATE
      SET
        rating = guide_rating_agg.rating + EXCLUDED.rating,
		review_count = guide_rating_agg.review_count + 1;

    ELSIF NEW.target_type = 'driver' THEN
      INSERT INTO driver_rating_agg (driver_id, rating, review_count)
      VALUES (NEW.target_id, NEW.rating, 1)
      ON CONFLICT (driver_id) DO UPDATE
      SET
        rating = driver_rating_agg.rating + EXCLUDED.rating,
		review_count = driver_rating_agg.review_count + 1;
    END IF;

    RETURN NEW;
  END IF;

  -- DELETE
  IF (TG_OP = 'DELETE') THEN
    IF OLD.target_type = 'hotel' THEN
      UPDATE hotel_rating_agg
      SET
        rating = rating - OLD.rating,
        review_count = review_count - 1
      WHERE hotel_id = OLD.target_id;

    ELSIF OLD.target_type = 'guide' THEN
      UPDATE guide_rating_agg
      SET
        rating = rating - OLD.rating,
        review_count = review_count - 1
      WHERE guide_id = OLD.target_id;

    ELSIF OLD.target_type = 'driver' THEN
      UPDATE driver_rating_agg
      SET
        rating = rating - OLD.rating,
        review_count = review_count - 1
      WHERE driver_id = OLD.target_id;
    END IF;

    RETURN OLD;
  END IF;

  -- UPDATE (rating change only)
  IF (TG_OP = 'UPDATE') THEN
    IF NEW.rating IS DISTINCT FROM OLD.rating THEN

      IF NEW.target_type = 'hotel' THEN
        UPDATE hotel_rating_agg
        SET
          rating = rating - OLD.rating + NEW.rating
        WHERE hotel_id = NEW.target_id;

      ELSIF NEW.target_type = 'guide' THEN
        UPDATE guide_rating_agg
        SET
          rating = rating - OLD.rating + NEW.rating
        WHERE guide_id = NEW.target_id;

      ELSIF NEW.target_type = 'driver' THEN
        UPDATE driver_rating_agg
        SET
          rating = rating - OLD.rating + NEW.rating
        WHERE driver_id = NEW.target_id;
      END IF;
      
    END IF;

    RETURN NEW;
  END IF;

  RETURN NULL;
END;
$$;