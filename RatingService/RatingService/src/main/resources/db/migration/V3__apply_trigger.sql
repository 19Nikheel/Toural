--  Create triggers on all partitions of the parent automatically (idempotent)
DO $$
DECLARE
  part record;
  trgname text := 'trg_user_target_reviews';
  full_trg_name text;
BEGIN
  FOR part IN
    SELECT c.relname AS partition_name, n.nspname AS schema_name
    FROM pg_inherits i
    JOIN pg_class c ON i.inhrelid = c.oid
    JOIN pg_class p ON i.inhparent = p.oid
    JOIN pg_namespace n ON c.relnamespace = n.oid
    WHERE p.relname = 'user_target_reviews'
  LOOP
    full_trg_name := trgname || '_' || part.partition_name;
    -- create only if missing
    IF NOT EXISTS (
      SELECT 1
      FROM pg_trigger t
      JOIN pg_class tc ON t.tgrelid = tc.oid
      WHERE tc.relname = part.partition_name
        AND NOT t.tgisinternal
        AND t.tgname = full_trg_name
    ) THEN
      EXECUTE format('CREATE TRIGGER %I
                      AFTER INSERT OR UPDATE OR DELETE
                      ON %I.%I
                      FOR EACH ROW
                      EXECUTE FUNCTION user_target_reviews_agg_trigger()',
                      full_trg_name, part.schema_name, part.partition_name);
    END IF;
  END LOOP;
END$$; 