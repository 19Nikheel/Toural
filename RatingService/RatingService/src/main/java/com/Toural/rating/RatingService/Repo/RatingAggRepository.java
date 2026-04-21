package com.Toural.rating.RatingService.Repo;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;

public interface RatingAggRepository extends JpaRepository<Object, Long> {

    @Modifying
    @Query(value = """
        INSERT INTO hotel_rating_agg (hotel_id, rating, review_count)
        VALUES (:id, :rating, :count)
        ON CONFLICT (hotel_id)
        DO UPDATE SET rating = :rating, review_count = :count
        """, nativeQuery = true)
    void upsertHotel(@Param("id") Long id,
                     @Param("rating") double rating,
                     @Param("count") int count);

    @Modifying
    @Query(value = """
        INSERT INTO guide_rating_agg (guide_id, rating, review_count)
        VALUES (:id, :rating, :count)
        ON CONFLICT (guide_id)
        DO UPDATE SET rating = :rating, review_count = :count
        """, nativeQuery = true)
    void upsertGuide(@Param("id") Long id,
                     @Param("rating") double rating,
                     @Param("count") int count);

    @Modifying
    @Query(value = """
        INSERT INTO driver_rating_agg (driver_id, rating, review_count)
        VALUES (:id, :rating, :count)
        ON CONFLICT (driver_id)
        DO UPDATE SET rating = :rating, review_count = :count
        """, nativeQuery = true)
    void upsertDriver(@Param("id") Long id,
                      @Param("rating") double rating,
                      @Param("count") int count);
}